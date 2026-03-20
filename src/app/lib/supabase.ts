import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Tidak perlu panggil process.env lagi di sini, 
// karena fungsi di bawah ini sudah otomatis mencarinya di .env.local kamu.
export const supabase = createClientComponentClient();