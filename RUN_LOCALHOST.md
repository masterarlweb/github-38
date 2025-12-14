# Cara Menjalankan di Localhost (Bukan Lovable)

## 🚨 Masalah
Jika Anda melihat domain `https://kontenih-57.lovable.app`, itu berarti Anda masih mengakses aplikasi yang di-host di Lovable.

## ✅ Solusi: Jalankan di Localhost

### Langkah 1: Install Dependencies
```bash
npm install
```

### Langkah 2: Buat File .env
Buat file `.env` di root project dengan isi:
```env
VITE_SUPABASE_URL=https://uvujmcltsqtqgreehwsh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here
```

**Cara mendapatkan Supabase credentials:**
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke Settings > API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

### Langkah 3: Setup Supabase Redirect URLs (PENTING!)
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Authentication > URL Configuration**
4. Di bagian **Redirect URLs**, tambahkan:
   - `http://localhost:8080/kontenih-ai`
   - `http://localhost:8080/**`
5. Di bagian **Site URL**, set ke: `http://localhost:8080`
6. **HAPUS** semua URL yang mengandung `lovable.app`
7. **Save** perubahan

### Langkah 4: Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:8080**

### Langkah 5: Buka di Browser
Buka browser dan akses: **http://localhost:8080**

**JANGAN** akses `https://kontenih-57.lovable.app` lagi!

## ⚠️ Troubleshooting

### Masih redirect ke Lovable setelah sign in?
1. **Cek Supabase Auth Configuration:**
   - Pastikan Redirect URLs sudah di-set dengan `http://localhost:8080/kontenih-ai`
   - Pastikan Site URL sudah di-set ke `http://localhost:8080`
   - Hapus semua URL Lovable dari Redirect URLs

2. **Clear Browser Cache & LocalStorage:**
   - Buka Developer Tools (F12)
   - Application tab > Clear Storage
   - Atau di Console, ketik:
     ```javascript
     localStorage.clear();
     sessionStorage.clear();
     ```

3. **Pastikan menggunakan localhost:**
   - Akses `http://localhost:8080` (bukan `https://kontenih-57.lovable.app`)
   - Jangan bookmark atau buka URL Lovable

### Port 8080 sudah digunakan?
Ubah port di `vite.config.ts`:
```typescript
server: {
  host: "::",
  port: 3000, // atau port lain
}
```

## 📝 Catatan Penting

- **Lovable adalah platform hosting** - jika Anda mengakses `kontenih-57.lovable.app`, itu berarti aplikasi masih di-host di Lovable
- **Untuk menggunakan localhost**, Anda HARUS menjalankan `npm run dev` di komputer Anda
- **Setelah setup**, aplikasi akan berjalan di `http://localhost:8080` dan tidak akan redirect ke Lovable lagi

## 🎯 Checklist

- [ ] Dependencies sudah di-install (`npm install`)
- [ ] File `.env` sudah dibuat dengan Supabase credentials
- [ ] Supabase Redirect URLs sudah di-set ke `http://localhost:8080/kontenih-ai`
- [ ] Supabase Site URL sudah di-set ke `http://localhost:8080`
- [ ] Semua URL Lovable sudah dihapus dari Supabase Redirect URLs
- [ ] Development server sudah berjalan (`npm run dev`)
- [ ] Browser mengakses `http://localhost:8080` (bukan Lovable URL)

Setelah semua checklist selesai, aplikasi akan berjalan di localhost dan tidak akan redirect ke Lovable lagi! 🎉
