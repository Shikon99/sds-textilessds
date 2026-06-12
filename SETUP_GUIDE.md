# Quick Setup Guide

## 1. GOOGLE OAUTH SETUP

### In Supabase Dashboard:
1. Go to **Authentication → Providers**
2. Click **Google**
3. Enable the provider
4. Add Client ID and Client Secret from Google Cloud Console

### In Google Cloud Console:
1. Create OAuth 2.0 credentials (Web application)
2. Add redirect URIs:
   - `https://YOUR_DOMAIN/auth/callback`
   - `http://localhost:3000/auth/callback` (for local testing)
3. Copy Client ID & Secret to Supabase

## 2. CREATE ADMIN ACCOUNT

Run in your project root:

```bash
# If using npm
npx ts-node scripts/seed-admin.ts

# If using pnpm  
pnpm exec ts-node scripts/seed-admin.ts

# If using bun
bun run scripts/seed-admin.ts
```

**Admin Credentials:**
- Email: `admin@sdstextiles.com`
- Password: `Admin@123456`

⚠️ **Change this password immediately after first login!**

## 3. LOGIN/SIGNUP NOW HAS TWO OPTIONS

Users can now:
- **Email & Password** - Traditional login
- **Google Account** - One-click login/signup

## 4. DEPLOY TO CLOUDFLARE

When deploying:

1. **Build locally:**
```bash
npm install
npm run build
```

2. **Environment Variables** in Cloudflare:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
POSTGRES_URL=your_url
```

3. **Update Supabase** with your live domain:
   - Add to Google OAuth redirect URIs: `https://YOUR_DOMAIN/auth/callback`
   - Add to auth URL config: `https://YOUR_DOMAIN`

4. **Upload .next folder** to Cloudflare Pages

## 5. TESTING LOCALLY

```bash
npm run dev
```

Test:
- Visit `http://localhost:3000/auth/login`
- Try "Login with Google" button
- Try email/password login

## SUMMARY

✅ Google OAuth added to login & signup  
✅ Admin account seeding script ready  
✅ Auth callback handler for OAuth redirect  
✅ All pages ready for deployment

Just run the seed script, set up Google OAuth, and deploy!
