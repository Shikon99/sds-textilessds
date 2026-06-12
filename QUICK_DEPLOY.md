# 🚀 SDS Textiles - Quick Deployment to Cloudflare (5 Minutes)

**This is the fastest way to deploy your production-ready app to Cloudflare.**

---

## Step 1: Prerequisites (2 minutes)

### Install Wrangler CLI

```bash
npm install -g wrangler
```

Or with yarn:
```bash
yarn global add wrangler
```

### Verify Installation

```bash
wrangler --version
# Should output: wrangler X.X.X
```

---

## Step 2: Authenticate (1 minute)

```bash
wrangler login
```

This opens your browser. Sign in to Cloudflare and grant permissions. Return to terminal when done.

---

## Step 3: Build Project (1 minute)

Navigate to project directory:

```bash
cd /path/to/sds-textiles
```

Build for production:

```bash
pnpm build
```

Or with npm:
```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (41/41)
```

---

## Step 4: Deploy to Cloudflare (1 minute)

### Option A: Deploy with Wrangler (Recommended)

```bash
wrangler pages deploy .next --project-name=sds-textiles
```

**Or if project doesn't exist yet:**

```bash
wrangler pages create
# Follow prompts to create project
# Then deploy:
wrangler pages deploy .next
```

### Option B: Deploy via Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Click **Pages**
3. Click **Create project** → **Direct upload**
4. Drag & drop `.next` folder
5. Follow setup wizard

**Expected output:**
```
✓ Successfully deployed to Cloudflare Pages
✓ URL: https://sds-textiles-xxx.pages.dev
```

---

## Step 5: Configure Custom Domain (No extra time)

### In Cloudflare Dashboard:

1. Go to **Pages** → **sds-textiles**
2. Click **Custom domain**
3. Enter your domain: `yourdomain.com`
4. Click **Continue**
5. Update nameservers at your registrar:
   - ns1.cloudflare.com
   - ns2.cloudflare.com
6. Wait 24-48 hours for propagation

### Verify Domain

```bash
# Check when nameservers are updated
nslookup yourdomain.com

# Should show Cloudflare nameservers
# Then your domain will auto-configure
```

---

## Step 6: Configure SSL (Automatic)

Cloudflare automatically provides:
- ✅ Free SSL certificate
- ✅ Automatic HTTPS redirect
- ✅ Wildcard support (*.yourdomain.com)

**In Cloudflare Dashboard:**
1. Go to **SSL/TLS**
2. Set mode to **"Full (strict)"**
3. ✅ Done!

---

## Step 7: Enable Performance (1 click each)

### Caching
1. Go to **Caching** → **Cache Level** → Select **"Cache Everything"**

### Compression
1. Go to **Speed** → Enable:
   - ✅ Brotli compression
   - ✅ Minify CSS/JS
   - ✅ Polish (image optimization)

### Security
1. Go to **Security** → Set level to **"High"**

---

## Step 8: Test Your Site (30 seconds)

### Open Your Site

```bash
# On production domain
open https://yourdomain.com

# Or Cloudflare Pages URL
open https://sds-textiles-xxx.pages.dev
```

### Test Key Features

1. ✅ Homepage loads
2. ✅ Shop page displays products
3. ✅ Search works
4. ✅ Add to cart works
5. ✅ Checkout page loads
6. ✅ Images load fast

### Test API

```bash
# Search API
curl https://yourdomain.com/api/search?q=test

# Upload API
curl -X POST https://yourdomain.com/api/upload

# Should return 200 or 400 (not 500)
```

### Test Performance

```bash
# Check cache is working
curl -I https://yourdomain.com

# Look for header:
# CF-Cache-Status: HIT (good!)
```

---

## ✅ You're Done! 🎉

Your site is now live on Cloudflare with:

- ✅ HTTPS/SSL
- ✅ Edge caching
- ✅ Image optimization
- ✅ DDoS protection
- ✅ Fast global delivery
- ✅ 99.99% uptime SLA

---

## 📊 Monitor Your Site

### Check Status

```bash
# Via command line
wrangler pages deployment list

# Via Cloudflare Dashboard
# Pages → sds-textiles → Deployments
```

### View Analytics

1. Go to Cloudflare **Analytics**
2. See:
   - Traffic (requests, bandwidth)
   - Cache performance
   - Security (threats blocked)
   - Performance metrics

### Set Up Alerts

1. Go to **Notifications**
2. Create alerts for:
   - 🔴 Error rate spike
   - 🔴 Uptime issues
   - 🔴 DDoS attacks
   - 🔴 SSL certificate expiry

---

## 🔄 Deploy Updates

After you make code changes:

```bash
# 1. Rebuild
pnpm build

# 2. Redeploy
wrangler pages deploy .next

# Site updates in < 10 seconds
```

Or setup **automatic deployments** via GitHub:

1. Connect your GitHub repo to Cloudflare Pages
2. Every push to `main` auto-deploys
3. No manual commands needed!

---

## 🆘 Quick Troubleshooting

### Site shows 404

```bash
# Check .next directory exists
ls -la .next

# If not, rebuild
pnpm build

# Check wrangler.toml points to .next
cat wrangler.toml | grep "pages_build_output_dir"
```

### Images not loading

```bash
# Verify Blob token is set
echo $BLOB_READ_WRITE_TOKEN

# Should show long token, not empty
# If empty, add it to Cloudflare environment
```

### Slow performance

```bash
# Check cache headers
curl -I https://yourdomain.com/images/test.jpg
# Should see: CF-Cache-Status: HIT

# If not:
# 1. Go to Cloudflare Speed settings
# 2. Enable Brotli compression
# 3. Clear cache and wait 5 mins
```

### Build fails

```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build

# If still fails, check for TypeScript errors
pnpm type-check
```

---

## 📱 Next Steps (After Deployment)

1. **Monitor for 24 hours** - Watch error rates and performance
2. **Setup monitoring** - Configure Cloudflare alerts
3. **Add analytics** - Setup Google Analytics
4. **Submit to search engines** - Google/Bing webmaster tools
5. **Backup your data** - Enable Supabase backups
6. **Setup emails** - Configure Cloudflare email routing
7. **Scale features** - Add more premium features as needed

---

## 📞 Support

- **Cloudflare Docs**: https://developers.cloudflare.com
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Full Guide**: See `CLOUDFLARE_DEPLOYMENT_GUIDE.md`

---

## 🎯 Key Metrics to Watch

After deployment:

| Metric | Target | How to Check |
|--------|--------|--------------|
| Load Time | < 2s | Browser DevTools → Network |
| Cache Hit | > 85% | Cloudflare Analytics |
| Uptime | 99.99% | Cloudflare Status |
| Error Rate | < 0.1% | Cloudflare Logs |

---

**🚀 Your production site is now live on Cloudflare!**

**Questions? See the full deployment guide: `CLOUDFLARE_DEPLOYMENT_GUIDE.md`**

---

## Pro Tips 🎯

### Tip 1: Auto-Deploy via GitHub
Connect your GitHub repo to Cloudflare for automatic deployments on every push.

### Tip 2: Preview URLs
Every branch gets a preview URL: `https://branch-name.sds-textiles.pages.dev`

### Tip 3: Instant Rollback
Roll back to any previous deployment in < 10 seconds.

### Tip 4: Zone Analytics
Monitor real-time traffic, cache hit ratio, and threats in Cloudflare dashboard.

### Tip 5: Custom Headers
All security headers are configured in `next.config.mjs` - customize as needed.

---

**Happy deploying! 🎉**
