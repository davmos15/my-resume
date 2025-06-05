# Technical Notes - My Resume Astro Site

## Critical Implementation Details

### 1. Unified Card and Modal System - CRITICAL

**Problem**: The cards on both `/resume` and `/projects` pages had timing issues where clicking cards would fail until after a page reload due to race conditions between component initialization and page scripts.

**Root Cause**: 
- Scripts tried to access `window.unifiedModal` before the CardModal component finished initializing
- No proper dependency chain between modal manager and page scripts
- Timing issues with Astro's script loading order

**WORKING SOLUTION**: Event-driven initialization pattern with proper dependency management:

```javascript
// In CardModal.astro - Modal Manager with Event Dispatch
class UnifiedModalManager {
    constructor() {
        // ... initialization code ...
        
        // After all initialization is complete, dispatch ready event
        document.dispatchEvent(new CustomEvent('modalManagerReady'));
    }
}

// In projects.astro and resume.astro - Event-driven Initialization
document.addEventListener('modalManagerReady', () => {
    // Set up card click handlers only after modal manager is ready
    document.querySelectorAll('[data-card-type="project"]').forEach(card => {
        card.addEventListener('click', function() {
            // Safe to use window.unifiedModal here
            window.unifiedModal.open(data);
        });
    });
});
```

**Key Features of This Implementation**:
1. **Event-driven Pattern**: `modalManagerReady` event ensures proper initialization order
2. **Unified System**: Single CardModal component works for both projects and resume
3. **Accessibility**: ARIA attributes, focus trap, keyboard navigation
4. **Responsive Design**: Mobile-optimized with smooth animations
5. **Theme Support**: Theme-specific hover overlays and styling
6. **Clean Architecture**: Separation of concerns with reusable components

**Architecture Overview**:
- `src/components/CardModal.astro`: Unified modal component with event dispatch
- `public/css/unified-cards.css`: Complete styling system for cards and modals
- Page scripts: Event-driven initialization in projects.astro and resume.astro

**DO NOT**:
- Remove the event-driven pattern - it's critical for timing
- Split the modal functionality across multiple components
- Use setTimeout or polling instead of the event system
- Remove the unified CSS approach

**Key Points**:
- The `modalManagerReady` event eliminates all timing issues
- Both pages use the same CardModal component for consistency
- The unified CSS provides responsive design and theme support
- This approach is maintainable and scalable for future enhancements

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