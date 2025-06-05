# My Resume - Astro Version

A modern portfolio website built with Astro, featuring a dynamic admin panel and content management system.

## 🚀 Features

- **Static Site Generation** with dynamic API routes
- **Admin Panel** for content management
- **SQLite Database** for content storage
- **Authentication** system with JWT tokens
- **Unified Card System** with smooth animations and modal interactions
- **Responsive Design** with theme support
- **Contact Form** with database storage
- **File Upload** capabilities
- **SEO Optimized** with fast page loads

## 📦 Tech Stack

- **Framework**: Astro 5.x
- **Runtime**: Node.js with @astrojs/node adapter
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT + bcryptjs
- **Styling**: CSS with theme variables
- **Deployment**: Optimized for Vercel

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-resume-astro
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your settings:
```env
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
```

5. Generate a password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## 🏃‍♂️ Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 🏗️ Building for Production

Build the site:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on Vercel
3. Add your environment variables
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Node.js:
- Netlify (with @astrojs/netlify adapter)
- Railway
- Render
- Fly.io

## 📁 Project Structure

```
/
├── public/
│   ├── css/         # Stylesheets
│   │   └── unified-cards.css  # Unified card system styles
│   ├── js/          # Client-side JavaScript
│   └── images/      # Static images
├── src/
│   ├── components/  # Astro components
│   │   └── CardModal.astro  # Unified modal system
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes and API endpoints
│   │   ├── api/     # API routes
│   │   └── admin/   # Admin pages
│   ├── lib/         # Utilities
│   └── middleware/  # Auth middleware
├── database/        # Database files and migrations
└── uploads/         # User uploads
```

## 🔒 Admin Panel

Access the admin panel at `/admin/login`

Features:
- Manage homepage content
- Add/edit projects
- Update resume sections
- Upload files
- View contact messages

## 🎨 Theming

The site supports multiple themes including:
- Basic themes (Blue, Green, Purple, etc.)
- AFL team themes
- Company themes (Google, Facebook, etc.)
- Fun themes (Rainbow, Sunset, etc.)

## 📝 License

ISC License
