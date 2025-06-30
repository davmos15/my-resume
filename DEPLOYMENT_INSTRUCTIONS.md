# 🚀 Deployment Instructions - Portfolio Website

Your portfolio website is configured for **Vercel** deployment with a modern inline expansion system.

## 📋 Pre-Deployment Checklist

1. **Ensure Latest Changes**
   ```bash
   git add .
   git commit -m "Update: Implement inline expansion system"
   git push origin master
   ```

2. **Generate Admin Password Hash**
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_SECURE_PASSWORD', 10));"
   ```
   Save this hash - you'll need it for the `ADMIN_PASSWORD_HASH` environment variable.

## 🌐 Vercel Deployment (Recommended)

### Automatic Deployment via GitHub

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add these required variables:
   ```
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD_HASH=your_bcrypt_hash_from_step_2
   ```
   - Optional (auto-generated if not provided):
   ```
   JWT_SECRET=your_random_string_for_jwt_signing
   ```

4. **Deploy**: 
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - Future pushes to `master` branch will auto-deploy

### Manual Deployment via CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to configure your project.

3. **Set Environment Variables**:
   ```bash
   vercel env add ADMIN_USERNAME
   vercel env add ADMIN_PASSWORD_HASH
   ```

## 🔧 Configuration Details

### Astro Configuration
Your site is already configured for Vercel in `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel()
});
```

### Database Behavior
- **SQLite Database**: Recreated on each deployment (suitable for portfolio use)
- **Data Persistence**: Admin data and contact messages reset with each deployment
- **Storage Location**: `/tmp` directory on Vercel serverless functions

## 🎯 Post-Deployment Testing

### 1. Test Core Functionality
- [ ] **Home Page**: Typewriter animation, theme switching
- [ ] **Projects Page**: Click cards to expand inline (no modals!)
- [ ] **Resume Page**: Click sections to expand, nested job details
- [ ] **Contact Page**: Submit contact form
- [ ] **Admin Panel**: Login at `/admin/login`

### 2. Test Inline Expansion System
- [ ] **Single Expansion**: Only one card expands at a time
- [ ] **Smooth Animation**: 0.4s ease-in-out transitions
- [ ] **Auto-scroll**: Page scrolls to expanded content
- [ ] **Keyboard Navigation**: Escape key closes expanded cards
- [ ] **Mobile Responsive**: Cards expand properly on mobile

### 3. Test Admin Features
- [ ] **Login**: Admin username/password works
- [ ] **Dashboard**: View contact messages and stats
- [ ] **Projects Management**: Add/edit/delete projects
- [ ] **Resume Management**: Add/edit/delete resume sections

## 🔒 Security Features

- ✅ **Password Hashing**: BCrypt for admin authentication
- ✅ **Environment Variables**: Sensitive data stored securely
- ✅ **Input Validation**: Contact form sanitization
- ✅ **HTTPS**: Automatic SSL via Vercel
- ✅ **Session Management**: JWT-based authentication

## 📊 Performance Features

- ✅ **Inline Expansion**: No modal timing issues
- ✅ **CSS Grid**: Responsive layouts with intelligent reflow
- ✅ **Smooth Animations**: Hardware-accelerated transitions
- ✅ **Progressive Enhancement**: Works without JavaScript
- ✅ **Mobile-First**: Optimized for all device sizes

## 🌍 Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   - Add CNAME record pointing to your Vercel domain
   - Or use Vercel nameservers for full management

## 🆘 Troubleshooting

### Build Issues
- **Check build logs** in Vercel dashboard
- **Environment variables** must be set correctly
- **Node version**: Vercel uses Node 18+ by default

### Database Issues
- Database recreates on each deployment (expected behavior)
- Contact messages won't persist between deployments
- For persistent data, consider Vercel Postgres add-on

### Expansion System Issues
- Ensure `/public/css/inline-expansion.css` is included
- Check browser console for JavaScript errors
- Verify card elements have correct CSS classes

## 📈 Monitoring & Analytics

- **Vercel Analytics**: Available in project dashboard
- **Function Logs**: Monitor API endpoint performance
- **Contact Form**: Messages stored in database (viewable via admin)

## 🚀 Success!

Your portfolio is now live with:
- **Modern inline expansion system** (no more modal timing issues!)
- **Smooth animations** and **responsive design**
- **Admin panel** for content management
- **Contact form** with database storage
- **Automatic deployments** from GitHub

**Your site will be available at**: `your-project.vercel.app`

Need help? Check the Vercel dashboard logs or contact support.