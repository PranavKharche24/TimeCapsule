# Time Capsule - Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel --prod
```

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the Vite framework
6. Click "Deploy"

## Environment Variables (Required)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Name | Value | Description |
|------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend-api.com` | Backend API URL |
| `VITE_APP_ENV` | `production` | Environment |
| `VITE_APP_NAME` | `Time Capsule` | App name |

## Vercel Configuration

The project includes `vercel.json` with:
- ✅ Framework detection (Vite)
- ✅ Build command configuration
- ✅ SPA routing support
- ✅ Security headers
- ✅ Output directory setup

## Deployment Commands

### For Production
```bash
npm run build:vercel
```

### For Preview
```bash
vercel
```

## Domain Configuration

### Custom Domain
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificate is automatically provided

### Default Domain
Vercel provides: `https://your-project-name.vercel.app`

## Automatic Deployments

- ✅ **Main branch** → Production deployment
- ✅ **Other branches** → Preview deployments
- ✅ **Pull requests** → Preview deployments

## Performance Features

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Image optimization
- ✅ Compression (gzip/brotli)
- ✅ HTTP/2 support

## Monitoring & Analytics

Enable in Vercel Dashboard:
- Web Vitals monitoring
- Function logs
- Real User Monitoring (RUM)
- Speed Insights

## Troubleshooting

### Build Fails
```bash
# Check build locally first
npm run build:frontend

# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Import path issues
```

### Routing Issues
- Vercel config includes SPA routing
- All routes redirect to `/index.html`
- Client-side routing (Wouter) handles navigation

### API Connection
- Ensure `VITE_API_BASE_URL` is set
- Check CORS settings on backend
- Verify API endpoints are accessible

## Preview URLs

Each deployment gets a unique preview URL:
- Production: `https://time-capsule.vercel.app`
- Preview: `https://time-capsule-git-feature.vercel.app`

## Cost

- ✅ **Free tier**: Perfect for this project
- ✅ **No credit card required**
- ✅ **100GB bandwidth/month**
- ✅ **Unlimited static requests**

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test build locally first
4. Check Vercel documentation

**Ready for production!** 🚀
