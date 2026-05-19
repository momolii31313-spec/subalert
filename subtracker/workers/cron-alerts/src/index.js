export default {
  async scheduled(event, env, ctx) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Check 3 alert windows: 7, 3, 1 days out
    const windows = [7, 3, 1];
    const allSubs = [];

    for (const days of windows) {
      const target = new Date(today);
      target.setDate(target.getDate() + days);
      const targetStr = target.toISOString().split('T')[0];

      const url = `${env.SUPABASE_URL}/rest/v1/subscriptions?active=eq.true&or=(trial_end_date.eq.${targetStr},next_billing_date.eq.${targetStr})&select=*,profiles(email)`;
      const res = await fetch(url, {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`
        }
      });
      const subs = await res.json();
      subs.forEach(s => allSubs.push({ ...s, days_until: days }));
    }

    // Filter out ones already alerted today
    const toAlert = allSubs.filter(s => s.last_alert_sent !== todayStr);

    // Group by user
    const byUser = {};
    for (const sub of toAlert) {
      if (!byUser[sub.user_id]) byUser[sub.user_id] = { email: sub.profiles?.email, subs: [] };
      byUser[sub.user_id].subs.push(sub);
    }

    // Send alerts
    for (const [userId, { email, subs }] of Object.entries(byUser)) {
      if (!email) continue;
      await sendEmail(email, subs, env);
      // Mark as alerted
      const ids = subs.map(s => s.id);
      await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions?id=in.(${ids.join(',')})`, {
        method: 'PATCH',
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ last_alert_sent: todayStr })
      });
    }

    console.log(`Sent alerts to ${Object.keys(byUser).length} users`);
  }
};

async function sendEmail(toEmail, subs, env) {
  const total = subs.reduce((sum, s) => sum + Number(s.price), 0);
  const rows = subs.map(s => {
    const date = s.trial_end_date || s.next_billing_date;
    const label = s.trial_end_date ? 'trial ends' : 'renews';
    return `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>${escapeHtml(s.service_name)}</strong></td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">$${Number(s.price).toFixed(2)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;color:#666;">${label} in ${s.days_until}d</td>
    </tr>`;
  }).join('');

  const html = `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 8px;">⚠️ ${subs.length} charge${subs.length > 1 ? 's' : ''} coming up</h2>
  <p style="color:#666;margin:0 0 20px;">Total: <strong>$${total.toFixed(2)}</strong></p>
  <table style="width:100%;border-collapse:collapse;">${rows}</table>
  <p style="margin-top:24px;color:#666;font-size:14px;">
    Don't want one of these? <a href="${env.SITE_URL || 'https://subtracker.app'}/dashboard">Cancel it now</a>.
  </p>
</body></html>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: toEmail,
      subject: `${subs.length} subscription${subs.length > 1 ? 's' : ''} charging soon ($${total.toFixed(2)})`,
      html
    })
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
