import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    try {
      const parser = new PostalMime();
      const email = await parser.parse(message.raw);

      // The alias is the part before @
      const alias = message.to.split('@')[0].toLowerCase();

      // Look up user by alias
      const userRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/profiles?forward_alias=eq.${alias}&select=id`,
        {
          headers: {
            'apikey': env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`
          }
        }
      );
      const profiles = await userRes.json();
      if (!profiles.length) {
        console.log('Unknown alias:', alias);
        return;
      }
      const userId = profiles[0].id;

      // Ask Claude to extract subscription info
      const sub = await parseWithClaude(email, env.ANTHROPIC_API_KEY);
      if (!sub || !sub.is_subscription) {
        console.log('Not a subscription email');
        return;
      }

      // Save
      await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions`, {
        method: 'POST',
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          user_id: userId,
          service_name: sub.service_name,
          price: sub.price || 0,
          currency: sub.currency || 'USD',
          billing_cycle: sub.billing_cycle || 'monthly',
          trial_end_date: sub.trial_end_date || null,
          next_billing_date: sub.next_billing_date || null,
          auto_detected: true
        })
      });

      console.log('Added subscription:', sub.service_name, 'for user:', userId);
    } catch (err) {
      console.error('Parse error:', err);
    }
  }
};

async function parseWithClaude(email, apiKey) {
  const today = new Date().toISOString().split('T')[0];
  const prompt = `Today is ${today}. Extract subscription info from this email. Return ONLY valid JSON.

Fields:
- is_subscription: boolean (true if this is a subscription/trial confirmation, renewal notice, or recurring charge receipt)
- service_name: string (e.g. "Netflix", "Spotify")
- price: number (in the currency below; 0 if free trial)
- currency: string (USD, EUR, GBP, etc.)
- billing_cycle: "monthly" | "yearly" | "weekly" | "trial"
- trial_end_date: YYYY-MM-DD or null
- next_billing_date: YYYY-MM-DD or null

If NOT a subscription email (newsletter, marketing, password reset, etc.), return: {"is_subscription": false}

Subject: ${email.subject || ''}
From: ${email.from?.address || ''}
Body (first 2000 chars):
${(email.text || email.html || '').slice(0, 2000)}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  const cleaned = text.replace(/```json|```/g, '').trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}
