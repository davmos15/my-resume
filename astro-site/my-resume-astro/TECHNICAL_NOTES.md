# Technical Notes - My Resume Astro Site

## Critical Implementation Details

### 1. Resume Modal Initialization (Script Loading Order)

**Problem**: The resume cards on the `/resume` page require a click event that calls `openResumeModal()`, but this function is defined in `resume-modal.js`. Due to script loading timing issues, clicking cards would fail with "Resume modal failed to initialize" until after a page reload.

**Root Cause**: 
- Multiple scripts loading with `is:inline` directive execute immediately
- Race condition between `script.js` (which handles clicks) and `resume-modal.js` (which defines the modal functions)
- No coordination between script dependencies

**Solution**: Created a `page-initializer.js` that coordinates script initialization:

```javascript
// page-initializer.js handles:
1. Component registration and initialization tracking
2. Dependency resolution between scripts
3. Queuing of actions until dependencies are ready
4. The toggleCard function that properly waits for modal initialization
```

**Implementation**:
```html
<!-- In resume.astro -->
<!-- Load page initializer first -->
<script src="/js/page-initializer.js"></script>

<!-- Load resume modal script -->
<script src="/js/resume-modal.js?v=3"></script>

<script>
// Initialize when everything is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.initializeResumePage();
    });
} else {
    window.initializeResumePage();
}
</script>
```

**Key Points**:
- DO NOT use `is:inline` for interdependent scripts
- Load scripts in dependency order
- Use the PageInitializer pattern for coordinating initialization
- The `toggleCard` function is now in `page-initializer.js`, not `script.js`

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
- `/public/js/page-initializer.js` - Script coordination system
- `/public/js/resume-modal.js` - Resume modal functionality
- `/public/js/script.js` - General site functionality (NOT toggleCard)

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