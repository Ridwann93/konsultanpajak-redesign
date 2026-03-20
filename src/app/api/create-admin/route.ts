import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, role, password } = await request.json();

  // Gunakan SERVICE_ROLE_KEY (Ambil dari Supabase Settings > API)
  // JANGAN gunakan anon_key untuk urusan admin
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Tambahkan ini di .env.local
  );

  try {
    // 1. Daftarkan ke sistem AUTH (Login)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: password, // Password default jika tidak diisi
      email_confirm: true // Langsung aktif tanpa konfirmasi email
    });

    if (authError) throw authError;

    // 2. Masukkan ke tabel 'users' kamu dengan ID yang SAMA
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .insert([
        { 
          id: authUser.user.id, // ID diambil dari Auth tadi
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