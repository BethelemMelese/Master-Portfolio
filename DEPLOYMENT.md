# Deployment Guide

This guide will help you deploy your Master Portfolio to production.

## Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free tier works great)
- ✅ Sanity project set up
- ✅ Resend account (for contact form emails)

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest and most optimized platform for Next.js applications.

#### Step 1: Prepare Your Repository

1. Make sure your code is committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click **"Deploy"**

#### Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

   **Required:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=0p7jkymm
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   RESEND_API_KEY=re_your_actual_resend_api_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

   **Optional (for Sanity Studio write access):**
   ```
   SANITY_API_TOKEN=your_sanity_api_token
   ```

3. After adding variables, redeploy your project:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Select **"Redeploy"**

#### Step 4: Configure Sanity CORS

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **CORS origins**
4. Add your production domain:
   - **Origin**: `https://your-domain.vercel.app`
   - **Allow credentials**: ✅ Yes
   - Click **Add CORS origin**

#### Step 5: Configure Resend Email Domain

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your domain (or use the default `onboarding@resend.dev` for testing)
3. Update the `from` email in `app/api/contact/route.ts` with your verified domain

#### Step 6: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable with your custom domain
5. Update Sanity CORS with your custom domain

---

### Option 2: Netlify

#### Step 1: Create `netlify.toml`

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click **"Deploy site"**

#### Step 3: Configure Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Add the same environment variables as listed in Vercel section above

---

### Option 3: Self-Hosted (VPS/Server)

#### Step 1: Build the Application

```bash
npm run build
```

#### Step 2: Start Production Server

```bash
npm start
```

#### Step 3: Use PM2 for Process Management

```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx (Reverse Proxy)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Sanity CORS origins include production domain
- [ ] Resend API key is configured
- [ ] Contact form is tested and working
- [ ] Sanity Studio is accessible at `/studio`
- [ ] All images load correctly
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active (automatic on Vercel/Netlify)
- [ ] Analytics/monitoring is set up (optional)

---

## Troubleshooting

### Images Not Loading

- Check that `next.config.js` has correct Sanity image domains
- Verify Sanity project ID and dataset are correct

### Contact Form Not Working

- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for API key status
- Ensure the `from` email domain is verified in Resend

### Sanity Studio Not Loading

- Check CORS origins in Sanity dashboard
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check browser console for errors

### Build Errors

- Run `npm run build` locally to catch errors
- Check Vercel/Netlify build logs
- Ensure all dependencies are in `package.json`

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Yes | Sanity dataset name (usually "production") |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ Yes | Sanity API version (e.g., "2024-01-01") |
| `RESEND_API_KEY` | ✅ Yes | Resend API key for contact form |
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | Your production site URL |
| `SANITY_API_TOKEN` | ⚠️ Optional | For write access in Sanity Studio |

---

## Continuous Deployment

Once connected to Vercel/Netlify, every push to your main branch will automatically trigger a new deployment. This is enabled by default.

To disable auto-deploy:
- **Vercel**: Settings → Git → Production Branch → Disable auto-deploy
- **Netlify**: Site settings → Build & deploy → Stop auto-publishing

---

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Resend Documentation](https://resend.com/docs)

