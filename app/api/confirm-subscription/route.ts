import { createServer } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, action } = await request.json();

  if (action === 'confirm') {
    await supabase
      .from('subscriptions')
      .update({ pending_confirmation: false })
      .eq('id', id)
      .eq('user_id', user.id);
  } else if (action === 'reject') {
    await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
  }

  return NextResponse.json({ success: true });
}
