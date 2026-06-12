# SDS Textiles - Complete Cloudflare Deployment Guide

## Prerequisites

- Domain registered and pointing to Cloudflare nameservers
- Cloudflare account (free tier works)
- Node.js 18+ installed
- Git installed
- GitHub account (for auto-deployments optional)

## Step 1: Prepare Your Project

### 1.1 Install Wrangler CLI

```bash
npm install -g @cloudflare/wrangler
# or
pnpm add -g @cloudflare/wrangler
```

### 1.2 Authenticate with Cloudflare

```bash
wrangler login
```

This opens your browser to authenticate. Grant permissions and return to terminal.

### 1.3 Create wrangler.toml

The project already includes `wrangler.toml` with optimal settings. Review and update:

```bash
cat wrangler.toml
```

Key sections to customize:
- `name`: Your project name
- `site.directory`: Points to `.next` (Next.js output)
- `env.production.vars.NEXT_PUBLIC_API_URL`: Your domain

## Step 2: Configure Environment Variables

### 2.1 Create `.env.production` locally

```bash
cp .env.example .env.production
```

Required variables:
```
NEXT_PUBLIC_API_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=SDS Textiles
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### 2.2 Set Cloudflare Secrets

```bash
# Set secrets in Cloudflare
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
wrangler secret put BLOB_READ_WRITE_TOKEN
```

When prompted, paste each value.

## Step 3: Domain Setup

### 3.1 Point Domain to Cloudflare

1. Go to your domain registrar
2. Update nameservers to Cloudflare's:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
3. Wait 24-48 hours for propagation (check with `nslookup yourdomain.com`)

### 3.2 Configure DNS in Cloudflare Dashboard

1. Log into Cloudflare → Select your domain
2. Go to **DNS** section
3. Add these records:
   ```
   Type: CNAME
   Name: @
   Target: yourdomain.com.cdn.cloudflarePages.com
   Proxy status: Proxied
   
   Type: CNAME
   Name: www
   Target: yourdomain.com.cdn.cloudflarePages.com
   Proxy status: Proxied
   ```

4. Go to **SSL/TLS** → Set to "Full (strict)"
5. Go to **Page Rules** → Create rules:
   - Pattern: `https://yourdomain.com/*`
   - Settings: Cache Level = Cache Everything (for static)

### 3.3 Configure Email Routing (Optional)

1. **Email Routing** → Enable
2. Create rules:
   ```
   From: hello@yourdomain.com → To: your-actual-email@gmail.com
   From: orders@yourdomain.com → To: your-actual-email@gmail.com
   ```

## Step 4: Build & Deploy

### 4.1 Build Locally First

```bash
npm run build
# Verify .next directory exists
ls -la .next
```

### 4.2 Deploy to Cloudflare Pages

```bash
# Using Wrangler
wrangler pages deploy .next --project-name=sds-textiles

# Or using Cloudflare dashboard:
# 1. Go to Pages
# 2. Click "Create project"
# 3. Select "Direct upload"
# 4. Upload .next folder
```

### 4.3 Connect GitHub for Auto-Deploy (Recommended)

1. In Cloudflare Dashboard → Pages
2. Click "Create project" → "Connect to Git"
3. Authorize GitHub
4. Select your repository
5. Configure build settings:
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   ```
6. Click Deploy

Every push to `main` branch now auto-deploys!

## Step 5: Configure Performance & Security

### 5.1 Enable Caching

In Cloudflare Dashboard:

1. **Caching** → Set cache level to "Cache Everything"
2. **Speed** → Enable:
   - Brotli compression
   - Minify CSS/JS
   - Rocket Loader (optional)
3. **Page Rules** → Add:
   ```
   https://yourdomain.com/api/* → Cache Level: Bypass
   https://yourdomain.com/_next/* → Cache Level: Cache Everything
   https://yourdomain.com/images/* → Cache Level: Cache Everything
   ```

### 5.2 Security Settings

1. **Security** → Set to "High"
2. **DDoS Protection** → Enable (automatic)
3. **Firewall Rules** → Add protection:
   ```
   (cf.bot_management.score < 30) → Challenge
   (ip.geoip.country in {"KP" "IR"}) → Block (optional)
   ```
4. **WAF (Web Application Firewall)** → Enable OWASP Core Rule Set

### 5.3 SSL/TLS

1. Go to **SSL/TLS**
2. Set to **"Full (strict)"**
3. Create origin certificate:
   - Click "Origin Server"
   - Generate certificate
   - Copy and save locally (for API calls)

## Step 6: Image & Asset Optimization

### 6.1 Image Optimization

1. Go to **Speed** → **Image Optimization**
2. Enable "Polish" (free tier)
3. Select "Smart" or "Lossy" optimization
4. Enable "Automatic AVIF"

### 6.2 Blob Storage Integration

- Vercel Blob URLs work seamlessly with Cloudflare
- Images are served via Cloudflare CDN automatically
- Cache TTL: 1 year for images

## Step 7: Monitor & Maintain

### 7.1 Analytics

Check Cloudflare Dashboard:
- **Analytics** → View traffic, cache hit ratio, threats blocked
- **Performance** → Monitor Core Web Vitals
- **Workers** → Check any serverless function logs

### 7.2 Uptime Monitoring

1. Go to **Notifications**
2. Create alert for:
   - Requests drop below threshold
   - Error rate above 5%
   - DDoS attack detected

### 7.3 Logs & Debugging

```bash
# View deployment logs
wrangler pages deployment list

# View real-time logs
wrangler tail --project-name=sds-textiles
```

## Step 8: Custom Domain & SSL

### 8.1 Wildcard SSL (Included Free)

- Cloudflare automatically provides wildcard SSL
- Includes `*.yourdomain.com`
- No additional cost

### 8.2 WWW Redirect

Add Page Rule:
```
Pattern: http://yourdomain.com/*
Forward to: https://www.yourdomain.com/$1
Status code: 301
```

## Step 9: Database Connections

### 9.1 Supabase Connection from Cloudflare

Cloudflare can reach Supabase directly:

```javascript
// Your API routes use SUPABASE_URL and SUPABASE_ANON_KEY
// These are in wrangler.toml as secrets
```

### 9.2 Connection Pooling

For high-traffic apps, enable connection pooling:

```
Supabase Dashboard → Database → Connection pooling
Mode: Transaction
```

## Step 10: Post-Deployment Checklist

### Performance Testing

```bash
# Test Core Web Vitals
curl https://yourdomain.com

# Check redirect chains
curl -I https://yourdomain.com
# Should be single 200 OK, not multiple redirects

# Test API endpoints
curl https://yourdomain.com/api/search?q=test

# Test image optimization
curl -I https://your-blob-image-url.com
# Should see CF-Cache-Status header
```

### Security Verification

- [ ] SSL is "Full (strict)" in Cloudflare
- [ ] Security level set to "High"
- [ ] DDoS protection enabled
- [ ] WAF rules enabled
- [ ] Email protection enabled
- [ ] CNAME records set correctly

### SEO Verification

- [ ] robots.txt accessible: `https://yourdomain.com/robots.txt`
- [ ] sitemap.xml accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Meta tags present on homepage
- [ ] Schema.org structured data present
- [ ] Canonical URLs set correctly

### Functionality Testing

- [ ] Guest checkout works
- [ ] Product images load from Blob
- [ ] Search autocomplete works
- [ ] Wishlist saves
- [ ] Cart persists
- [ ] Reviews display with images
- [ ] Loyalty points show
- [ ] Email notifications send
- [ ] Admin dashboard loads
- [ ] Analytics display correctly

## Step 11: Troubleshooting

### Issue: 502 Bad Gateway

**Solution:**
```bash
# Check if Next.js build succeeded
npm run build

# Verify wrangler.toml points to .next
# Check Cloudflare build logs
wrangler pages deployment list
```

### Issue: Images Not Loading

**Solution:**
```bash
# Verify Blob token in environment
echo $BLOB_READ_WRITE_TOKEN

# Check image URLs are publicly accessible
curl https://blob.vercelusercontent.com/...
```

### Issue: Slow Performance

**Solution:**
1. Enable caching: Cloudflare → Caching → Cache Everything
2. Enable compression: Cloudflare → Speed → Brotli
3. Check cache hit ratio: Analytics → Cache status

### Issue: CORS Errors

**Solution:**
Add to next.config.mjs:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
      ],
    },
  ]
}
```

## Cost Estimation

- **Domain**: $10-15/year
- **Cloudflare**: Free (or $20/month Pro for advanced features)
- **Supabase**: Free tier up to 500MB database
- **Vercel Blob**: $0.50 per 1GB stored
- **Total**: Free to $50/month depending on scale

## Performance Benchmarks

After Cloudflare deployment, expect:

| Metric | Target | Typical |
|--------|--------|---------|
| First Contentful Paint | < 1.8s | 0.8-1.2s |
| Largest Contentful Paint | < 2.5s | 1.5-2.0s |
| Cumulative Layout Shift | < 0.1 | 0.05 |
| Cache Hit Ratio | > 80% | 85-95% |

## Next Steps

1. **Monitor for 24 hours**: Check analytics, error rates
2. **Optimize further**: Based on Core Web Vitals
3. **Setup email**: Configure Cloudflare email routing
4. **Add analytics**: Google Search Console, Google Analytics
5. **Backup**: Configure Supabase backups
6. **Scale**: Upgrade Cloudflare plan if needed

---

**You're now live on Cloudflare! 🚀**

For help:
- Cloudflare Docs: https://developers.cloudflare.com
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
