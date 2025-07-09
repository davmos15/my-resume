// Debug endpoint to check about page data
export async function GET() {
  try {
    const { allAsync } = await import('../../../lib/db.js');
    
    // Get all about page content
    const aboutContent = await allAsync(
      'SELECT * FROM page_content WHERE page_name = ?',
      ['about']
    );
    
    // Get all page content for comparison
    const allContent = await allAsync('SELECT * FROM page_content ORDER BY page_name, section_name');
    
    return new Response(JSON.stringify({ 
      success: true,
      aboutContent,
      allContent,
      aboutContentCount: aboutContent.length,
      totalContentCount: allContent.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Debug error:', error);
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