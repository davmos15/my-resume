# Technical Notes - My Resume Astro Site

## Current Architecture

### 1. Inline Expansion System - Current Implementation

**System**: The site now uses a modern inline expansion system instead of modals, eliminating all timing issues and providing a better user experience.

**Key Components**:
- `/public/css/inline-expansion.css` - Complete styling system for expandable cards
- Page-specific JavaScript classes handle expansion logic directly in projects.astro and resume.astro
- No complex polling or modal managers needed

**How It Works**:
```javascript
// In projects.astro and resume.astro
class InlineExpansionManager {
  constructor() {
    this.cards = document.querySelectorAll('.expandable-card');
    this.currentlyExpanded = null;
    this.init();
  }
  
  expandCard(card) {
    // Close currently expanded card if any
    if (this.currentlyExpanded && this.currentlyExpanded !== card) {
      this.collapseCard(this.currentlyExpanded);
    }
    
    card.classList.add('expanded');
    this.currentlyExpanded = card;
    
    // Auto-scroll to expanded content
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.pageYOffset - 100, behavior: 'smooth' });
    }, 100);
  }
}
```

**Benefits**:
- **No timing issues** - Works instantly on page load
- **Better mobile UX** - Cards expand inline without blocking viewport
- **Smooth animations** - CSS-based transitions at 0.4s ease-in-out
- **Single expansion** - Only one card open at a time for clean UX
- **Keyboard accessible** - Escape key closes expanded cards
- **Theme compatible** - Uses existing CSS variables

### 2. Database Setup for Vercel

**Environment**: Vercel serverless with SQLite database recreation on cold starts

**Implementation**: 
- `/src/lib/db-init.js` handles database initialization
- Uses `/tmp` directory on Vercel (detected via `process.env.VERCEL`)
- Database and tables created on first request
- Seeded with default data each deployment

**Important**: Data doesn't persist between deployments - suitable for demo/portfolio use

### 3. Environment Variables Required

For Vercel deployment:
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD_HASH`: BCrypt hash of admin password
- `JWT_SECRET`: Random string for JWT signing (optional, auto-generated if missing)

Generate password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
```

### 4. Contact Form Implementation

**System**: Stores messages in SQLite database, no email sending
- Form submissions saved to `contact_messages` table
- Admin can view messages through admin panel
- Simple and secure approach without API keys

**API Endpoint**: `/src/pages/api/contact.js`
- Validates input (name, email, message required)
- Email format validation
- Stores in database with timestamp

## File Structure

### Core Files
- `/src/lib/db.js` - Database exports
- `/src/lib/db-init.js` - Database initialization logic
- `/public/css/inline-expansion.css` - Complete expansion system styling
- `/public/js/script.js` - General site functionality (typewriter, collapsibles, file cabinet)

### Page Files
- `/src/pages/projects.astro` - Projects with inline expansion
- `/src/pages/resume.astro` - Resume with nested job expansion
- `/src/layouts/BaseLayout.astro` - Base layout (no modal imports)

### Admin System
- `/src/pages/admin/` - Admin dashboard, login, and management pages
- `/src/middleware/auth.js` - Authentication middleware
- `/src/pages/api/` - API endpoints for admin functionality

## Deployment Configuration

**Current Setup**: Vercel serverless
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',
  adapter: vercel()
});
```

**Build**: `npm run build` creates optimized production build
**Dev**: `npm run dev` runs development server on port 4322

## Security Features

- **Password Hashing**: BCrypt for admin passwords
- **Session Management**: JWT-based authentication
- **Input Validation**: Contact form validation and sanitization
- **Environment Variables**: Sensitive data in environment variables

## Performance Optimizations

- **CSS Grid**: Responsive card layouts with intelligent reflow
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Event-Driven**: Clean JavaScript architecture without polling
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Future Considerations

**For Persistent Data Storage**:
- Vercel Postgres for production data persistence
- Supabase or PlanetScale for external database
- Vercel KV for session storage

**Current SQLite Approach Works For**:
- Portfolio/demo sites
- Low-traffic applications
- Sites where data can be seeded on deployment

## Maintenance Notes

- **Dependencies**: Keep Astro and adapters updated
- **Database**: Current approach recreates data on deployment (suitable for portfolio)
- **Monitoring**: Check Vercel function logs for any issues
- **Performance**: Inline expansion system is highly performant with minimal JavaScript