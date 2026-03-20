Buka "README SQL", jalankan semua perintah.

lalu buka Kembali readme ini.

- Buka supabase, buka halaman project setting yang ada di sidebar.

- buka menu API Keys:
setelah masuk ke halaman, pilih menu yang bertuliskan "Legacy anon, service_role API keys", lalu copy keys "anon public" dan keys "service role" dan taruh variable NEXT_PUBLIC_SUPABASE_ANON_KEY dan SUPABASE_SERVICE_ROLE_KEY yang ada dibawah teks ini.

selanjutnya untuk mengisi variable NEXT_PUBLIC_SUPABASE_URL. buka halaman "Project Overview" yang ada di side bar. copy teks yang bertuliskan "https://********.supabase.co", lalu pastekan di variable dibawah teks ini.


(buat file di folder project, Bernama ".env.local" lalu paste kode dibawah)

NEXT_PUBLIC_SUPABASE_URL=taruh disini
NEXT_PUBLIC_SUPABASE_ANON_KEY=taruh disini
SUPABASE_SERVICE_ROLE_KEY=taruh disini


Langkah terakhir. buka terminal di dalam projek, lalu ketik "npm install".

projek siap dijalankan "npm run dev".