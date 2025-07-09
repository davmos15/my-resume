// Database initialization endpoint - call once to set up PostgreSQL
export async function GET() {
  try {
    // Import the database module
    const { default: db } = await import('../../../lib/db.js');
    
    // Initialize database (creates tables and seeds data)
    await db.initialize();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database initialized successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}