# 🚀 Deployment Guide - Kontenih-57

Panduan lengkap untuk deploy website Kontenih-57 ke berbagai platform hosting.

## 📦 Persiapan Sebelum Deploy

### 1. Build Project
```bash
npm run build
```

File hasil build akan ada di folder `dist/`

### 2. Environment Variables
Pastikan Anda sudah menyiapkan environment variables berikut:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🌐 Platform Hosting

### Option 1: Vercel (Paling Mudah & Recommended)

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - Project name? kontenih-57
# - Directory? ./
# - Override settings? N
```

**Via GitHub (Recommended):**
1. Push code ke GitHub repository
2. Login ke [Vercel](https://vercel.com/)
3. Klik "Add New Project"
4. Import repository dari GitHub
5. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
7. Click "Deploy"

**Keuntungan Vercel:**
- ✅ Free tier sangat generus
- ✅ Auto-deploy dari GitHub
- ✅ SSL otomatis
- ✅ CDN global
- ✅ Custom domain gratis

---

### Option 2: Netlify

**Via CLI:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Via Drag & Drop:**
1. Build project: `npm run build`
2. Login ke [Netlify](https://netlify.com/)
3. Drag folder `dist/` ke Netlify dashboard
4. Add site name
5. Configure environment variables di Site settings > Environment variables

**Via GitHub:**
1. Push ke GitHub
2. Login Netlify
3. New site from Git
4. Connect GitHub repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add environment variables
7. Deploy

---

### Option 3: Cloudflare Pages

1. Push code ke GitHub
2. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to Pages > Create a project
4. Connect GitHub repository
5. Configure:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Add environment variables
7. Save and Deploy

**Keuntungan Cloudflare Pages:**
- ✅ Free tier unlimited
- ✅ CDN global tercepat
- ✅ Auto-deploy dari GitHub
- ✅ SSL otomatis

---

### Option 4: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add script ke `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages di repository settings:
   - Settings > Pages
   - Source: gh-pages branch
   - Save

**Note:** GitHub Pages tidak support environment variables secara langsung. Anda perlu hardcode atau gunakan build-time replacement.

---

### Option 5: Self-Hosted (VPS/Server)

**Setup dengan Nginx:**

1. Build project:
```bash
npm run build
```

2. Copy folder `dist/` ke server:
```bash
scp -r dist/* user@your-server:/var/www/kontenih/
```

3. Setup Nginx config (`/etc/nginx/sites-available/kontenih`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/kontenih;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/kontenih /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. Setup SSL dengan Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔧 Environment Variables Setup

### Vercel
1. Go to Project Settings > Environment Variables
2. Add variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Select environments (Production, Preview, Development)
4. Redeploy

### Netlify
1. Site settings > Environment variables
2. Add variables
3. Redeploy

### Cloudflare Pages
1. Pages > Your Project > Settings > Environment Variables
2. Add variables
3. Redeploy

---

## ✅ Post-Deployment Checklist

- [ ] Website bisa diakses
- [ ] Semua halaman berfungsi
- [ ] Supabase connection bekerja
- [ ] Authentication berfungsi
- [ ] Environment variables sudah di-set
- [ ] SSL/HTTPS aktif
- [ ] Custom domain sudah di-configure (jika ada)
- [ ] Analytics/tracking sudah di-setup (jika perlu)

---

## 🐛 Troubleshooting

### Build Error
- Pastikan Node.js versi 18+
- Hapus `node_modules` dan install ulang
- Cek error message di build log

### Environment Variables Tidak Bekerja
- Pastikan nama variable dimulai dengan `VITE_`
- Restart development server setelah mengubah `.env`
- Di production, pastikan sudah di-set di hosting platform

### Routing Error (404)
- Pastikan hosting platform support SPA routing
- Configure redirect rules ke `index.html`
- Vercel & Netlify sudah auto-handle ini

### Supabase Connection Error
- Cek credentials di environment variables
- Pastikan Supabase project masih aktif
- Cek CORS settings di Supabase dashboard

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Selamat deploy! 🎉**

