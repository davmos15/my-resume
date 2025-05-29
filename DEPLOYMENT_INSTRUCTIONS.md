# 🚀 Deployment Instructions - Portfolio Website

Your website is now ready for deployment! Here are step-by-step instructions for different platforms.

## 📋 Pre-Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Generate Admin Password Hash**
   Create a new password hash for production:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_NEW_PASSWORD', 10));"
   ```
   Save this hash for the `ADMIN_PASSWORD_HASH` environment variable.

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Best for SQLite)

Railway provides persistent storage for SQLite databases and is very easy to use.

1. **Create Account**: Go to [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Set Environment Variables**:
   - Go to Variables tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=3005
     SESSION_SECRET=<generate-random-string>
     ADMIN_USERNAME=<your-username>
     ADMIN_PASSWORD_HASH=<your-bcrypt-hash>
     ```

4. **Deploy**: Railway will automatically deploy your app

5. **Custom Domain** (optional):
   - Go to Settings → Domains
   - Add your custom domain

### Option 2: Render

1. **Create Account**: Go to [render.com](https://render.com)

2. **Create Web Service**:
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository
   - Name: `portfolio-website`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**:
   Add the same variables as above

4. **Deploy**: Click "Create Web Service"

### Option 3: Vercel

Note: Vercel doesn't persist SQLite data between deployments. Consider using a cloud database.

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add all required variables

### Option 4: Self-Hosting (VPS)

For a VPS (DigitalOcean, Linode, etc.):

1. **SSH into server**
2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment**:
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

6. **Install PM2**:
   ```bash
   sudo npm install -g pm2
   pm2 start app.js --name portfolio
   pm2 startup
   pm2 save
   ```

7. **Set up Nginx** (optional):
   ```bash
   sudo apt install nginx
   # Configure reverse proxy to port 3005
   ```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong SESSION_SECRET
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Keep `.env` file secure
- [ ] Regularly update dependencies

## 🧪 Post-Deployment Testing

1. **Test all pages**:
   - Home page
   - Resume page
   - Projects page
   - About page
   - Contact page

2. **Test functionality**:
   - Submit contact form
   - Check theme switching
   - Verify admin login
   - Test file uploads

3. **Mobile testing**:
   - Check responsive design
   - Test on different devices

## 📊 Monitoring

- Check application logs regularly
- Monitor contact form submissions
- Set up uptime monitoring (UptimeRobot, etc.)

## 🆘 Troubleshooting

**Database Issues**:
- Ensure write permissions for SQLite file
- Check if platform supports persistent storage

**Environment Variables**:
- Double-check all variables are set
- Ensure no quotes in platform's env var settings

**Port Issues**:
- Some platforms assign PORT automatically
- Remove PORT from env vars if platform provides it

## 📧 Contact Form Notes

The contact form stores messages in the SQLite database. You can:
1. Check messages via admin panel (when implemented)
2. Query database directly
3. Set up email notifications later using services like SendGrid

## 🎉 Success!

Once deployed, your portfolio will be live at:
- Railway: `your-app.up.railway.app`
- Render: `your-app.onrender.com`
- Vercel: `your-app.vercel.app`
- Or your custom domain

Need help? Check the logs in your hosting platform's dashboard.