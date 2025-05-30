# Migration to Astro - Step by Step Guide

This guide will help you migrate your portfolio site to Astro while preserving all functionality.

## What You Need to Do:

### 1. Create a New Repository
First, create a new repository for the Astro version:
```bash
# Create a new directory outside your current project
cd ~/projects
mkdir my-resume-astro
cd my-resume-astro
git init
```

### 2. Initialize Astro Project
```bash
npm create astro@latest . -- --template minimal --typescript base --no-install
npm install
```

### 3. Install Required Dependencies
```bash
npm install @astrojs/node express sqlite3 bcryptjs jsonwebtoken multer dotenv cookie-parser express-session express-rate-limit
```

### 4. Copy Essential Files
Copy these files from your original project:
```bash
# From your original project directory
cp -r database/ ../my-resume-astro/
cp -r middleware/ ../my-resume-astro/
cp -r public/ ../my-resume-astro/
cp -r uploads/ ../my-resume-astro/
cp .env ../my-resume-astro/
cp render.yaml ../my-resume-astro/
```

### 5. Update Configuration Files
Create/update these files in your new Astro project:

**astro.config.mjs:**
```js
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 3000
  }
});
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro preview",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

### 6. Project Structure
Your new Astro project should have this structure:
```
my-resume-astro/
├── src/
│   ├── components/
│   │   ├── Layout.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro
│   │   └── ResumeCard.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── AdminLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── resume.astro
│   │   ├── contact.astro
│   │   ├── admin/
│   │   │   ├── login.astro
│   │   │   ├── dashboard.astro
│   │   │   ├── projects.astro
│   │   │   ├── resume.astro
│   │   │   └── [...slug].astro
│   │   └── api/
│   │       ├── auth/[...auth].js
│   │       ├── projects/[...projects].js
│   │       ├── resume/[...resume].js
│   │       └── contact.js
│   └── middleware/
│       └── auth.js
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── database/
├── uploads/
└── astro.config.mjs
```

### 7. Environment Variables
Create a `.env` file with your existing variables:
```
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-password-hash
NODE_ENV=development
```

### 8. Deploy to Vercel

1. Push your new repository to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add your environment variables
6. Deploy!

## Benefits of This Migration:

1. **Better Performance**: Static pages load instantly
2. **Modern Architecture**: Component-based development
3. **API Routes**: Built-in API handling for dynamic features
4. **Free Hosting**: Works perfectly on Vercel's free tier
5. **No More Card Issues**: Consistent rendering across all pages

## Next Steps:

Once you've created the new directory and initialized Astro, let me know and I'll help you:
1. Convert all your EJS templates to Astro components
2. Set up the API routes for admin functionality
3. Migrate the database operations
4. Ensure all features work correctly

Ready to start? Create the new directory and run the initialization commands above!