# Setup Independen dari Lovable

Panduan untuk memastikan aplikasi Kontenih berjalan sepenuhnya independen dari Lovable, tanpa redirect ke domain Lovable dan tanpa menggunakan Lovable AI Gateway.

## ✅ Checklist Independensi

### 1. Redirect URLs (SUDAH BENAR ✅)
Semua redirect setelah sign in sudah menggunakan domain sendiri:
- `src/components/Hero.tsx` → `${window.location.origin}/kontenih-ai`
- `src/components/Header.tsx` → `${window.location.origin}/kontenih-ai`
- `src/pages/Auth.tsx` → `${window.location.origin}/kontenih-ai`

**Tidak ada redirect ke `lovable.app`!**

### 2. Supabase Auth Configuration (PENTING!)

**Setup Redirect URLs di Supabase Dashboard:**
1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Authentication > URL Configuration**
4. Di bagian **Redirect URLs**, tambahkan:
   - `http://localhost:8080/kontenih-ai` (untuk development)
   - `http://localhost:8080/**` (untuk semua path di localhost)
   - `https://yourdomain.com/kontenih-ai` (untuk production)
   - `https://yourdomain.com/**` (untuk semua path di production)
5. Di bagian **Site URL**, set ke:
   - Development: `http://localhost:8080`
   - Production: `https://yourdomain.com`
6. **HAPUS** semua URL yang mengandung `lovable.app` dari Redirect URLs
7. **Save** perubahan

**Catatan:** Tanpa konfigurasi ini, Supabase akan redirect ke Site URL default (yang mungkin masih lovable.app).

### 3. Edge Functions - AI API Configuration

**Setup Environment Variables di Supabase Edge Functions:**

1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Pilih project Anda
3. Pergi ke **Project Settings > Edge Functions > Secrets**
4. Tambahkan secrets berikut (WAJIB untuk independensi):

```env
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
AI_API_KEY=your_openrouter_api_key_here
AI_MODEL=openrouter/auto
AI_HTTP_REFERER=https://yourdomain.com
AI_TITLE=Kontenih AI
```

**Atau gunakan AI API lain:**
- **OpenAI:** 
  - `AI_API_URL=https://api.openai.com/v1/chat/completions`
  - `AI_API_KEY=sk-...`
  - `AI_MODEL=gpt-4` atau `gpt-3.5-turbo`
  
- **Anthropic (Claude):**
  - `AI_API_URL=https://api.anthropic.com/v1/messages`
  - `AI_API_KEY=sk-ant-...`
  - `AI_MODEL=claude-3-opus-20240229`

- **Google Gemini:**
  - `AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
  - `AI_API_KEY=your_google_api_key`

**PENTING:** 
- ❌ **JANGAN** set `LOVABLE_API_KEY` (sudah dihapus dari fallback)
- ✅ **WAJIB** set `AI_API_KEY` untuk fungsi AI bekerja
- ✅ `brand-consultant` function akan menggunakan `AI_API_KEY` jika tersedia
- ✅ `video-script-chat` function akan menggunakan `AI_API_KEY` (tidak ada fallback Lovable lagi)

### 4. Edge Functions yang Sudah Diupdate

#### `brand-consultant/index.ts`
- ✅ Menggunakan `AI_API_URL` dan `AI_API_KEY` langsung
- ✅ Fallback ke `N8N_WEBHOOK_URL` jika `AI_API_KEY` tidak tersedia (untuk backward compatibility)
- ❌ **TIDAK** menggunakan Lovable API lagi

#### `video-script-chat/index.ts`
- ✅ Menggunakan `AI_API_URL` dan `AI_API_KEY` langsung
- ❌ **TIDAK** ada fallback ke Lovable gateway
- ✅ Default ke OpenRouter jika `AI_API_URL` tidak di-set

### 5. Client-Side Code

**Semua redirect sudah benar:**
- ✅ `src/components/Hero.tsx` - menggunakan `${window.location.origin}/kontenih-ai`
- ✅ `src/components/Header.tsx` - menggunakan `${window.location.origin}/kontenih-ai`
- ✅ `src/pages/Auth.tsx` - menggunakan `${window.location.origin}/kontenih-ai`

**API Calls:**
- ✅ `src/pages/KontenihAI.tsx` - menggunakan Supabase Edge Functions (`/functions/v1/brand-consultant`)
- ✅ Tidak ada direct call ke Lovable API

### 6. Session Management

**`src/integrations/supabase/client.ts`:**
- ✅ Membersihkan session lama dari Lovable domain (jika ada)
- ✅ Menggunakan localStorage dengan key berdasarkan Supabase project ID

## 🚀 Testing Independensi

### Test 1: Sign In Redirect
1. Buka aplikasi di `http://localhost:8080`
2. Klik "Sign in dengan Google"
3. Setelah sign in, pastikan redirect ke `http://localhost:8080/kontenih-ai`
4. **BUKAN** redirect ke `lovable.app`

### Test 2: AI Chat Functionality
1. Setelah sign in, buka halaman `/kontenih-ai`
2. Kirim pesan ke AI
3. Cek Network tab di Developer Tools
4. Pastikan request ke `/functions/v1/brand-consultant` (Supabase Edge Function)
5. **BUKAN** request ke `lovable.dev` atau `ai.gateway.lovable.dev`

### Test 3: Production Deployment
1. Deploy ke production (Vercel/Netlify/Cloudflare)
2. Update Supabase Redirect URLs dengan domain production
3. Test sign in di production
4. Pastikan redirect ke domain production, bukan Lovable

## 📝 Environment Variables Summary

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### Supabase Edge Functions Secrets
```env
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
AI_API_KEY=your_api_key
AI_MODEL=openrouter/auto
AI_HTTP_REFERER=https://yourdomain.com
AI_TITLE=Kontenih AI
```

## ⚠️ Troubleshooting

### Masih redirect ke Lovable setelah sign in?
1. **Cek Supabase Auth Configuration:**
   - Pastikan Redirect URLs sudah di-set dengan benar
   - Pastikan Site URL sudah di-set ke domain Anda
   - Hapus semua URL Lovable dari Redirect URLs

2. **Clear Browser Cache & LocalStorage:**
   ```javascript
   // Di browser console:
   localStorage.clear();
   sessionStorage.clear();
   ```

3. **Cek redirectTo di code:**
   - Pastikan semua menggunakan `${window.location.origin}/kontenih-ai`
   - Tidak ada hardcoded URL ke Lovable

### AI Chat tidak bekerja?
1. **Cek Supabase Edge Functions Secrets:**
   - Pastikan `AI_API_KEY` sudah di-set
   - Pastikan `AI_API_URL` sudah benar
   - Test dengan curl:
     ```bash
     curl -X POST https://your-project.supabase.co/functions/v1/brand-consultant \
       -H "Authorization: Bearer YOUR_ANON_KEY" \
       -H "Content-Type: application/json" \
       -d '{"message": "test"}'
     ```

2. **Cek Edge Functions Logs:**
   - Supabase Dashboard > Edge Functions > brand-consultant > Logs
   - Lihat error messages

### Error "AI_API_KEY is not configured"?
- Pastikan sudah set `AI_API_KEY` di Supabase Edge Functions Secrets
- Redeploy Edge Functions setelah menambahkan secrets:
  ```bash
  supabase functions deploy brand-consultant
  supabase functions deploy video-script-chat
  ```

## ✅ Final Checklist

- [ ] Supabase Redirect URLs sudah di-set ke domain Anda (bukan Lovable)
- [ ] Supabase Site URL sudah di-set ke domain Anda
- [ ] `AI_API_KEY` sudah di-set di Supabase Edge Functions Secrets
- [ ] `AI_API_URL` sudah di-set (default: OpenRouter)
- [ ] Semua redirectTo di code menggunakan `${window.location.origin}/kontenih-ai`
- [ ] Test sign in redirect ke domain Anda (bukan Lovable)
- [ ] Test AI chat menggunakan Supabase Edge Functions (bukan Lovable API)
- [ ] Production domain sudah di-configure di Supabase

## 🎉 Selesai!

Setelah semua checklist di atas, aplikasi Anda sudah **100% independen dari Lovable**!

- ✅ Tidak ada redirect ke Lovable
- ✅ Tidak ada dependency ke Lovable AI Gateway
- ✅ Semua AI calls melalui Supabase Edge Functions dengan AI API Anda sendiri
- ✅ Bisa di-deploy ke domain mana saja

