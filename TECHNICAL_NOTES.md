# Technical Notes - My Resume Astro Site

## Critical Implementation Details

### 1. Simplified Card and Modal System - CRITICAL

**Problem**: The cards on both `/resume` and `/projects` pages had timing issues where clicking cards would fail until after a page reload due to complex event systems and race conditions.

**Root Cause**: 
- Over-complicated event-driven architecture caused timing dependencies
- Scripts tried to access modal manager before initialization
- Complex event listeners created race conditions

**WORKING SOLUTION**: Simple polling-based approach with direct DOM access:

```javascript
// In CardModal.astro - Simple Modal Manager Object
window.modalManager = {
    modal: null,
    isOpen: false,
    
    init() {
        this.modal = document.getElementById('unified-modal');
        if (!this.modal) return false;
        // ... setup modal elements and event listeners
        return true;
    },
    
    open(data) {
        // Direct modal opening logic
    }
};

// Initialize immediately when script loads
window.modalManager.init();

// In projects.astro and resume.astro - Simple Polling
function trySetupCards() {
    if (!window.modalManager || !window.modalManager.modal) {
        return false;
    }
    
    // Set up card click handlers using onclick (simple and reliable)
    document.querySelectorAll('[data-card-type="project"]').forEach(card => {
        card.onclick = function() {
            window.modalManager.open(data);
        };
    });
    return true;
}

// Poll every 100ms until modal is ready (max 5 seconds)
function pollForModal() {
    if (trySetupCards() || attempts >= maxAttempts) return;
    attempts++;
    setTimeout(pollForModal, 100);
}
pollForModal();
```

**Key Features of This Implementation**:
1. **Simple Polling**: No complex events, just checks every 100ms until ready
2. **Direct DOM Access**: Uses `onclick` instead of `addEventListener` for reliability
3. **Object-based Modal**: Simple object with methods instead of class complexity
4. **Immediate Initialization**: Modal manager starts immediately when script loads
5. **Fail-safe Timeout**: Stops trying after 5 seconds to prevent infinite loops
6. **Unified System**: Single modal works for both projects and resume pages

**Architecture Overview**:
- `src/components/CardModal.astro`: Simple modal object with direct initialization
- `public/css/unified-cards.css`: Complete styling system for cards and modals
- Page scripts: Simple polling-based setup in projects.astro and resume.astro

**DO NOT**:
- Reintroduce complex event systems - they cause timing issues
- Use addEventListener - onclick is more reliable for this use case
- Remove the polling mechanism - it ensures cards work on first load
- Complicate the modal manager with classes or complex state

**Key Points**:
- Simple polling eliminates all timing issues
- Direct DOM access is more reliable than event systems
- The approach is easy to debug and maintain
- Cards work consistently on first page load without hard refresh

### 2. Database Initialization on Vercel

**Problem**: Vercel's serverless environment doesn't persist files between invocations.

**Solution**: Created `src/lib/db-init.js` that:
- Uses `/tmp` directory on Vercel (detected via `process.env.VERCEL`)
- Initializes database on first request
- Creates all necessary tables
- Seeds with default admin user and sample data

**Critical**: The database is recreated on each cold start, so any persistent data needs a different storage solution.

### 3. Environment Variables Required

For deployment, these environment variables MUST be set:
- `JWT_SECRET`: Random string for JWT signing
- `SESSION_SECRET`: Random string for session encryption  
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD_HASH`: BCrypt hash of admin password

Generate password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
```

### 4. Astro Adapter Configuration

**For Vercel**: Use `@astrojs/vercel/serverless` adapter
```javascript
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

**For other platforms**: Switch back to `@astrojs/node` adapter with appropriate mode.

## Common Issues and Solutions

### Issue: Scripts not loading in correct order
**Solution**: Use the PageInitializer pattern documented above. Never use `is:inline` for interdependent scripts.

### Issue: 404 errors on API routes
**Solution**: Check that all API route files export named functions (GET, POST, PUT, DELETE) and return proper Response objects.

### Issue: Database not found errors
**Solution**: The database is created at runtime. Check that `db-init.js` is being imported and environment is properly detected.

## File Structure Notes

- `/src/lib/db.js` - Re-exports from db-init.js
- `/src/lib/db-init.js` - Actual database initialization logic
- `/src/components/CardModal.astro` - Unified modal component with event system
- `/public/css/unified-cards.css` - Complete card and modal styling system
- `/public/js/script.js` - General site functionality
- `/src/pages/projects.astro` and `/src/pages/resume.astro` - Event-driven page scripts

## Future Considerations

1. For persistent data storage, consider:
   - External database service (PostgreSQL, MySQL)
   - Vercel KV or Vercel Postgres
   - Planetscale, Supabase, or similar

2. The current SQLite approach works for:
   - Demo purposes
   - Low-traffic sites
   - Sites where data can be seeded on each deployment

3. Script loading could be further improved with:
   - Module bundling
   - Dynamic imports
   - Web Components for encapsulation