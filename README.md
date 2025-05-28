# Dynamic Portfolio Website

A dynamic portfolio website with backend admin panel, converted from static HTML to Node.js/Express with database-driven content management.

## Features

### Frontend
- **Responsive Design**: Clean, modern portfolio layout
- **Dynamic Content**: Database-driven pages and sections
- **Project Showcase**: Sortable projects with images and links
- **Resume Sections**: Collapsible experience, skills, education sections
- **Contact Form**: Functional contact form with validation

### Admin Panel
- **Secure Authentication**: Login system with session management
- **Rich Text Editor**: WYSIWYG editor with HTML/Preview modes
- **Content Management**: Edit all page content through admin interface
- **Project Management**: Add, edit, delete, and reorder projects
- **Resume Management**: Manage resume sections by category
- **File Management**: Upload and organize images, documents, PDFs
- **Drag & Drop Ordering**: Reorder items with visual feedback

### Technical Features
- **Database**: SQLite with easy migration to PostgreSQL/MySQL
- **File Upload**: Multer-based file handling with previews
- **Session Management**: Secure sessions with flash messages
- **Rich Text Editing**: Dual-mode editor with keyboard shortcuts
- **Responsive Admin**: Mobile-friendly admin interface

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Initialize database**
   ```bash
   node database/init.js
   ```

5. **Start the server**
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

## Usage

### Public Site
- Visit `http://localhost:3005` to view the portfolio
- Navigate between Home, Resume, Projects, About, and Contact pages

### Admin Panel
- Visit `http://localhost:3005/admin/login`
- Default credentials: `admin` / `admin123` (change immediately!)
- Manage content through the dashboard

### Admin Features
- **Dashboard**: Overview with quick actions
- **Page Content**: Edit homepage, about, and contact content
- **Projects**: Add/edit projects with rich descriptions and file attachments
- **Resume**: Manage experience, skills, courses, and education sections
- **Files**: Upload and manage images, PDFs, and documents

## Environment Variables

```env
NODE_ENV=development          # Environment mode
PORT=3005                    # Server port
SESSION_SECRET=<secret>      # Session encryption key
ADMIN_USERNAME=admin         # Admin username
ADMIN_PASSWORD_HASH=<hash>   # Bcrypt hash of admin password
```

## Project Structure

```
├── app.js                   # Main Express application
├── package.json            # Dependencies and scripts
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
│
├── database/               # Database files
│   ├── init.js            # Database initialization
│   └── db.js              # Database connection helpers
│
├── middleware/             # Custom middleware
│   └── auth.js            # Authentication middleware
│
├── routes/                # Route handlers
│   ├── public.js          # Public site routes
│   └── admin.js           # Admin panel routes
│
├── views/                 # EJS templates
│   ├── layouts/           # Layout templates
│   ├── partials/          # Reusable components
│   ├── pages/             # Public pages
│   └── admin/             # Admin interface
│
├── public/                # Static assets
│   ├── css/               # Stylesheets (including rich editor)
│   ├── js/                # Client-side JavaScript
│   └── images/            # Static images
│
└── uploads/               # User uploaded files (gitignored)
```

## Rich Text Editor

The admin panel includes a custom rich text editor with:

- **Dual Modes**: HTML code view and WYSIWYG preview
- **Formatting**: Bold, italic, underline, headings, lists, links
- **Keyboard Shortcuts**: Ctrl+B/I/U for formatting, Ctrl+Z/Y for undo/redo
- **History**: Full undo/redo functionality
- **Real-time Preview**: Live preview updates as you type

## Deployment

### Development
```bash
npm run dev
```

### Production
1. Set `NODE_ENV=production` in .env
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start app.js --name portfolio
   ```

### Database Migration
For production, consider migrating from SQLite to PostgreSQL:
- Update database connection in `database/db.js`
- Run migration scripts for schema creation
- Update environment variables

## Security

- Change default admin password immediately
- Use strong SESSION_SECRET in production
- Enable HTTPS in production
- Regular database backups
- File upload validation

## Migration from Static Site

See `MIGRATION_GUIDE.md` for detailed instructions on migrating from the original static HTML site.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite (easily migrated to PostgreSQL/MySQL)
- **Templates**: EJS with layouts
- **Authentication**: bcryptjs, express-session
- **File Upload**: Multer
- **Frontend**: Vanilla JavaScript, CSS3
- **Admin UI**: Custom responsive design
- **Rich Editor**: Custom implementation with dual modes

## License

This project is licensed under the ISC License.