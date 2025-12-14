# Setup Lokal & Hosting Kontenih-57

Panduan lengkap untuk menjalankan proyek Kontenih-57 secara lokal dan menghostingnya sendiri tanpa bergantung pada Lovable.

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** (v18 atau lebih baru) - [Download](https://nodejs.org/)
- **npm** atau **yarn** atau **pnpm**
- **Git** (opsional, untuk version control)

## 🚀 Setup Lokal

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 2. Setup Environment Variables

Buat file `.env` di root project (jika belum ada) dengan isi:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://uvujmcltsqtqgreehwsh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here

# Optional: Jika menggunakan Supabase Functions
# VITE_SUPABASE_PROJECT_ID=your_project_id

# Optional: Untuk AI Functions (Supabase Edge Functions)
# N8N_WEBHOOK_URL=your_n8n_webhook_url
# AI_API_URL=https://openrouter.ai/api/v1/chat/completions
# AI_API_KEY=your_openrouter_api_key_here
# AI_MODEL=openrouter/auto
# AI_HTTP_REFERER=https://yourdomain.com   # disarankan oleh OpenRouter
# AI_TITLE=Kontenih AI                     # disarankan oleh OpenRouter
# LOVABLE_API_KEY=your_lovable_api_key (fallback, jika masih memakai Lovable)
```

**Cara mendapatkan Supabase credentials:**
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke Settings > API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

**Setup Supabase Auth Redirect URLs (PENTING untuk localhost):**
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Authentication > URL Configuration**
4. Di bagian **Redirect URLs**, tambahkan:
   - `http://localhost:8080/kontenih-ai`
   - `http://localhost:8080/**` (opsional, untuk semua path)
   - `http://127.0.0.1:8080/kontenih-ai` (opsional)
5. Di bagian **Site URL**, set ke: `http://localhost:8080` (untuk development)
6. **Save** perubahan

**Catatan:** Tanpa konfigurasi ini, setelah sign in akan redirect ke URL lovable.app, bukan localhost!

**PENTING - Setup Supabase Edge Functions Environment Variables (WAJIB untuk independensi):**
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Project Settings > Edge Functions > Secrets**
4. Tambahkan secrets berikut (WAJIB):
   - `AI_API_URL` - URL endpoint AI API Anda (contoh: `https://openrouter.ai/api/v1/chat/completions`)
   - `AI_API_KEY` - API key untuk AI service Anda (contoh: OpenRouter API key) - **WAJIB DI-SET**
   - `AI_MODEL` - model yang digunakan (contoh: `openrouter/auto` atau model spesifik lain)
   - `AI_HTTP_REFERER` (opsional, disarankan OpenRouter) - domain Anda
   - `AI_TITLE` (opsional, disarankan OpenRouter) - nama aplikasi untuk header

**Catatan:** 
- ✅ Fungsi `brand-consultant` dan `video-script-chat` menggunakan `AI_API_URL`, `AI_API_KEY`, dan `AI_MODEL` untuk memanggil AI API
- ❌ **TIDAK ADA** fallback ke Lovable gateway lagi - aplikasi sekarang 100% independen
- ✅ Untuk menggunakan OpenRouter (recommended), set:
  - `AI_API_URL=https://openrouter.ai/api/v1/chat/completions`
  - `AI_API_KEY=<OpenRouter Key>` - **WAJIB**
  - `AI_MODEL=openrouter/auto` (atau model spesifik OpenRouter)
  - (opsional) `AI_HTTP_REFERER` dan `AI_TITLE` sesuai rekomendasi OpenRouter
- ✅ `brand-consultant` masih support fallback ke `N8N_WEBHOOK_URL` jika `AI_API_KEY` tidak tersedia (untuk backward compatibility)

**Lihat `INDEPENDENT_SETUP.md` untuk panduan lengkap setup independen dari Lovable.**

### 3. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Server akan berjalan di: **http://localhost:8080**

### 4. Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

### 5. Preview Production Build

```bash
npm run preview
```

## 🌐 Hosting & Deployment

### Opsi 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Atau deploy via GitHub:
   - Push code ke GitHub
   - Import project di [Vercel](https://vercel.com/)
   - Set environment variables di Vercel dashboard
   - Deploy otomatis setiap push

**Environment Variables di Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Opsi 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables di Netlify dashboard

### Opsi 3: Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Set environment variables di Cloudflare dashboard

### Opsi 4: Self-Hosted (VPS/Server)

1. Build project:
```bash
npm run build
```

2. Serve dengan Nginx atau Apache:
   - Copy folder `dist/` ke web server
   - Setup reverse proxy jika perlu
   - Configure SSL dengan Let's Encrypt

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/kontenih/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Troubleshooting

### Port sudah digunakan
Jika port 8080 sudah digunakan, ubah di `vite.config.ts`:
```typescript
server: {
  port: 3000, // atau port lain
}
```

### Error Supabase Connection
- Pastikan `.env` sudah diisi dengan benar
- Restart development server setelah mengubah `.env`
- Cek Supabase project masih aktif

### Dashboard masih redirect ke lovable.app
Jika setelah sign in masih redirect ke `https://kontenih-57.lovable.app`:
1. **Clear Browser Cache & LocalStorage:**
   - Buka Developer Tools (F12)
   - Pergi ke tab **Application** (Chrome) atau **Storage** (Firefox)
   - Klik **Clear site data** atau hapus semua data untuk `localhost:8080`
   - Atau manual: Hapus semua item di **Local Storage** yang berisi `supabase`
2. **Logout dan Login Lagi:**
   - Klik Sign Out di dashboard
   - Clear browser cache (Ctrl+Shift+Delete)
   - Login lagi dari localhost
3. **Hard Refresh:**
   - Tekan `Ctrl+Shift+R` (Windows/Linux) atau `Cmd+Shift+R` (Mac)
4. **Pastikan Supabase Redirect URLs sudah dikonfigurasi** (lihat bagian Setup Supabase Auth Redirect URLs di atas)

### Build Error
- Hapus `node_modules` dan `package-lock.json`
- Install ulang: `npm install`
- Cek versi Node.js: `node --version` (harus v18+)

## 📝 Scripts Available

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Security Notes

- **JANGAN** commit file `.env` ke Git
- File `.env` sudah ada di `.gitignore`
- Gunakan environment variables di hosting platform untuk production
- Supabase keys yang digunakan adalah **public keys** (aman untuk frontend)

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## ✅ Checklist Sebelum Deploy

- [ ] Dependencies terinstall (`npm install`)
- [ ] Environment variables sudah di-set
- [ ] Development server berjalan (`npm run dev`)
- [ ] Build berhasil (`npm run build`)
- [ ] Test semua fitur utama
- [ ] Environment variables sudah di-set di hosting platform
- [ ] Domain sudah di-configure (jika menggunakan custom domain)

---

**Selamat! Proyek Anda sekarang bisa dijalankan secara lokal dan di-hosting sendiri tanpa bergantung pada Lovable! 🎉**

