import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, role, password } = await request.json();


  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! 
  );

  try {
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: password, 
      email_confirm: true 
    });

    if (authError) throw authError;

    const { error: dbError } = await supabaseAdmin
      .from('users')
      .insert([
        { 
          id: authUser.user.id, 
          name, 
          email, 
          role 
        }
      ]);

    if (dbError) throw dbError;

    return NextResponse.json({ message: 'Admin berhasil dibuat!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}