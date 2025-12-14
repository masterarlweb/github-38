# Setup Google OAuth di Supabase

## Error yang Terjadi
```
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}
```

Error ini terjadi karena **Google OAuth provider belum diaktifkan** di Supabase Dashboard.

## ✅ Solusi: Aktifkan Google Provider

### Langkah 1: Login ke Supabase Dashboard
1. Buka [Supabase Dashboard](https://app.supabase.com/)
2. Login dengan akun Anda
3. Pilih project Anda

### Langkah 2: Aktifkan Google Provider
1. Di sidebar kiri, klik **Authentication**
2. Klik **Providers**
3. Scroll ke bawah, cari **Google**
4. Klik toggle untuk **mengaktifkan Google provider** (ON)
5. Akan muncul form untuk mengisi Google OAuth credentials

### Langkah 3: Setup Google OAuth Credentials

#### A. Buat Google OAuth Credentials
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project Anda (atau buat project baru)
3. Pergi ke **APIs & Services > Credentials**
4. Klik **Create Credentials > OAuth client ID**
5. Jika diminta, setup OAuth consent screen terlebih dahulu:
   - User Type: **External** (untuk testing) atau **Internal** (jika menggunakan Google Workspace)
   - App name: **Kontenih** (atau nama aplikasi Anda)
   - User support email: Email Anda
   - Developer contact: Email Anda
   - Klik **Save and Continue**
   - Scopes: Klik **Save and Continue** (default sudah cukup)
   - Test users: Tambahkan email Anda, klik **Save and Continue**
6. Kembali ke **Credentials**, klik **Create Credentials > OAuth client ID**
7. Application type: **Web application**
8. Name: **Kontenih OAuth** (atau nama lain)
9. **Authorized redirect URIs**: Tambahkan:
   ```
   https://uvujmcltsqtqgreehwsh.supabase.co/auth/v1/callback
   ```
   (Ganti dengan Supabase URL Anda jika berbeda)
10. Klik **Create**
11. **Copy Client ID dan Client Secret**

#### B. Masukkan Credentials ke Supabase
1. Kembali ke Supabase Dashboard > Authentication > Providers > Google
2. Paste **Client ID** ke field "Client ID (for OAuth)"
3. Paste **Client Secret** ke field "Client Secret (for OAuth)"
4. Klik **Save**

### Langkah 4: Test Sign In
1. Kembali ke aplikasi Anda (`http://localhost:8080`)
2. Klik "Sign in dengan Google"
3. Pilih akun Google Anda
4. Setelah berhasil, akan redirect ke `/kontenih-ai`

## ⚠️ Troubleshooting

### Masih error setelah setup?
1. **Pastikan redirect URI sudah benar:**
   - Di Google Cloud Console, pastikan redirect URI adalah:
     ```
     https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback
     ```
   - Ganti `YOUR_SUPABASE_PROJECT_ID` dengan project ID Anda

2. **Pastikan Google provider sudah diaktifkan:**
   - Di Supabase Dashboard > Authentication > Providers
   - Pastikan toggle Google adalah **ON** (hijau)

3. **Clear browser cache:**
   - Buka Developer Tools (F12)
   - Application tab > Clear Storage
   - Atau di Console:
     ```javascript
     localStorage.clear();
     sessionStorage.clear();
     ```

4. **Cek Supabase Logs:**
   - Supabase Dashboard > Logs > Auth Logs
   - Lihat error messages untuk detail lebih lanjut

### OAuth Consent Screen masih "Testing"?
- Untuk production, Anda perlu:
  1. Submit app untuk verification di Google Cloud Console
  2. Atau tambahkan test users di OAuth consent screen
  3. Atau ubah ke "Internal" jika menggunakan Google Workspace

## 📝 Catatan Penting

- **Development:** OAuth consent screen bisa tetap "Testing" dengan menambahkan test users
- **Production:** Perlu submit untuk verification jika ingin semua user bisa sign in
- **Redirect URI:** Harus sama persis di Google Cloud Console dan Supabase

## ✅ Checklist

- [ ] Google provider sudah diaktifkan di Supabase
- [ ] Google OAuth credentials sudah dibuat di Google Cloud Console
- [ ] Client ID dan Client Secret sudah diisi di Supabase
- [ ] Redirect URI sudah di-set di Google Cloud Console
- [ ] Redirect URI format: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
- [ ] Test sign in berhasil

Setelah semua checklist selesai, Google OAuth akan berfungsi! 🎉
