# Migration Guide: Static to Dynamic Portfolio

This guide will help you migrate from your static HTML site to the new dynamic Express/Node.js application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Basic knowledge of terminal/command line

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Initialize the Database

Run the database initialization script to create tables and default content:

```bash
node database/init.js
```

## Step 3: Environment Setup

1. The `.env` file has been created with default values
2. **IMPORTANT**: Change the following before deploying:
   - `SESSION_SECRET` - Use a long, random string
   - `ADMIN_PASSWORD_HASH` - Default password is "admin123"

To generate a new password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

## Step 4: Start the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Step 5: Access Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`
3. **Change the password immediately after first login**

## Step 6: Migrate Your Content

### Homepage Content
1. Go to Admin Dashboard > Page Content > Home
2. Update the hero title and subtitle with your information

### Resume Content
1. Go to Admin Dashboard > Resume
2. Add your work experience, education, skills, etc.
3. Set the display order for each section

### Projects
1. Go to Admin Dashboard > Projects
2. Add each project with:
   - Title and description
   - Technologies used
   - Links (GitHub, live demo)
   - Upload project screenshots

### About Page
1. Go to Admin Dashboard > Page Content > About
2. Update your bio and skills sections

### Contact Information
1. Go to Admin Dashboard > Page Content > Contact
2. Update email, phone, and location

## Step 7: File Migration

1. All images are already copied to `/public/images/`
2. For new uploads, use the file upload feature in the admin panel
3. Uploaded files will be stored in `/uploads/`

## Step 8: Deployment Considerations

### For Netlify (Current Host)
Since Netlify is for static sites, you'll need to switch to a Node.js hosting service:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS EC2

### Database Migration
For production, consider migrating from SQLite to:
- PostgreSQL (recommended for most hosts)
- MySQL
- MongoDB

### Security Checklist
- [ ] Change default admin password
- [ ] Update SESSION_SECRET in .env
- [ ] Enable HTTPS
- [ ] Set secure session cookies in production
- [ ] Implement rate limiting for login attempts
- [ ] Regular backups

## Step 9: Maintaining the Same Design

The application preserves your existing design by:
- Using the same CSS file (`styles.css`)
- Maintaining the same HTML structure
- Converting pages to EJS templates with minimal changes
- Keeping all JavaScript functionality

## Backup and Restore

### Backup Database
```bash
cp database/portfolio.db database/portfolio_backup_$(date +%Y%m%d).db
```

### Restore Database
```bash
cp database/portfolio_backup_YYYYMMDD.db database/portfolio.db
```

## Common Issues

### Port Already in Use
If port 3000 is in use, change it in the `.env` file:
```
PORT=3001
```

### Database Errors
If you encounter database errors, try removing the database and reinitializing:
```bash
rm database/portfolio.db
node database/init.js
```

### Session Issues
Clear your browser cookies or use incognito mode if you have login issues.

## Next Steps

1. Customize the admin panel styling to match your preferences
2. Add additional features like blog posts or testimonials
3. Implement email notifications for contact form submissions
4. Set up automated backups
5. Add Google Analytics or other tracking

## Support

If you encounter any issues during migration, check:
- Console logs for error messages
- Network tab in browser DevTools
- Node.js console output
- Database file permissions

Remember to test all functionality thoroughly before deploying to production!