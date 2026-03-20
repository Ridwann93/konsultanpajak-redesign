Buka supabase:
pada dashboard supabase, buka menu authentication pada sidebar. buka menu user. setelah itu klik "add user". lalu isi email dan password. sebagai contoh, disini saya menambahkan 2 user.

1. user pertama dengan email "admin@nusaindo.com" dan password "123456"
2. user kedua dengan email "staff@nusaindo.com" dan password "123456"

lalu simpan.


-- ==========================================
-- MEMBUAT STRUKTUR TABEL (copy kode dibawah ini ke sql editor, lalu jalankan)
-- ==========================================

CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  role text DEFAULT 'staff',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE landing_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text,
  content_key text,
  content_value text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  subject text,
  message text,
  status text DEFAULT 'New',
  converted_to_client boolean DEFAULT false,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  phone text,
  notes text,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;


-- Policy Users
CREATE POLICY "Allow authenticated users read users" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their profile" ON users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their profile" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Policy Landing Contents
CREATE POLICY "Allow public read access" ON landing_contents FOR SELECT TO anon USING (true);
CREATE POLICY "Allow authenticated update" ON landing_contents FOR ALL TO authenticated USING (true);

-- Policy Leads
CREATE POLICY "Tampilkan Leads" ON leads FOR SELECT TO public USING (true);
CREATE POLICY "Allow authenticated" ON leads FOR ALL TO authenticated USING (true);

-- Policy Clients
CREATE POLICY "Tampilkan Clients" ON clients FOR SELECT TO public USING (true);
CREATE POLICY "Allow authenticated" ON clients FOR ALL TO authenticated USING (true);


==========================================
BATAS KODE SQL
==========================================

- Selanjutnya setelah jalankan perintah sql, buka Kembali halaman Authentication, buka data user yang telah dibuat sebelumnya, copy id dari user tersebut.

- lalu masuk ke halaman tabel editor yang ada di sidebar. buka tabel "users". klik insert lalu insert row. di bagian kolom id, paste id yang tadi di copy di kolom id. lalu untuk kolom nama isi bebas, sebagai contoh saya isi "admin".

- untuk kolom email, isi email yang sesuai dengan id yang baru saja di copy.

- untuk role nya, wajib isi diantara 2 role berikut "admin" atau "staff". (tanpa petik)

- role admin mempunyai akses penuh terhadap crm dan cms.

- role staff mempunyai akses terbatas terhadap crm dan tidak punya akses ke cms.

- jika sudah, silahkan save.

- untuk login ke crm, cukup masukkan email dan password yang sudah dibuat tadi.
