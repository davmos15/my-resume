# Technical Notes - My Resume Astro Site

## Critical Implementation Details

### 1. Resume Modal Initialization (Script Loading Order) - CRITICAL

**Problem**: The resume cards on the `/resume` page require modal functionality. Due to script loading timing issues with Astro, clicking cards would fail until after a page reload.

**Root Cause**: 
- Astro's script handling can cause timing issues with external scripts
- Race conditions between different script files
- DOM elements might not be available when scripts execute

**WORKING SOLUTION**: Put ALL resume page functionality in a single inline script block directly in the resume.astro page:

```javascript
<script>
// All resume page functionality in one place to avoid timing issues
(function() {
    // ALL modal functionality, click handlers, and animations
    // are defined here in one self-contained block
    // NO external dependencies, NO timing issues
})();
</script>
```

**Why this works**:
1. Everything executes together when the DOM is ready
2. No race conditions between files
3. No dependency resolution needed
4. Direct access to all DOM elements

**DO NOT**:
- Split this functionality across multiple files
- Use external script files for page-specific functionality
- Try to coordinate between scripts with promises/callbacks
- Use `page-initializer.js` or similar coordination systems (they don't work reliably with Astro)

**Key Points**:
- Keep ALL resume page functionality in the inline script in resume.astro
- Do NOT move modal functions to external files
- Do NOT try to share functions between pages via global scripts
- This is the ONLY reliable solution that works with Astro's script handling

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