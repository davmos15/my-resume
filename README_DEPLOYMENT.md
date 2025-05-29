# Deployment Guide for Portfolio Website

This guide will help you deploy your portfolio website to production.

## Pre-Deployment Checklist

- [x] All code changes committed
- [x] Environment variables configured
- [x] Database schema created
- [x] Contact form tested
- [x] Theme system verified

## Deployment Options

### Option 1: Vercel (Recommended for Node.js apps)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Run deployment:
   ```bash
   vercel
   ```

3. Follow the prompts and set environment variables in Vercel dashboard

### Option 2: Railway (Best for SQLite database support)

1. Create account at https://railway.app
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Railway will auto-deploy on push

### Option 3: Render

1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Environment Variables

Set these in your hosting platform:

```
NODE_ENV=production
PORT=3005
SESSION_SECRET=[generate-a-secure-random-string]
ADMIN_USERNAME=[your-admin-username]
ADMIN_PASSWORD_HASH=[your-bcrypt-hash]
```

## Database Setup

The SQLite database will be created automatically on first run. Make sure your hosting platform supports persistent file storage for SQLite.

## Post-Deployment

1. Test all pages
2. Submit a test contact form
3. Verify admin login works
4. Check all themes function properly

## Domain Setup

1. Purchase domain (if needed)
2. Add custom domain in hosting platform
3. Update DNS records
4. Enable HTTPS (usually automatic)

## Monitoring

- Check server logs regularly
- Monitor contact form submissions
- Keep dependencies updated