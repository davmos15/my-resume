import { runAsync, getAsync, allAsync } from '../../../lib/db.js';

export async function POST({ request }) {
  try {
    const { pageName, sections } = await request.json();
    
    // Validate input
    if (!pageName || !sections) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Page name and sections are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Save each section to the database
    for (const [sectionName, content] of Object.entries(sections)) {
      if (content !== null && content !== undefined) {
        // Check if section already exists
        const existing = await getAsync(
          'SELECT id FROM page_content WHERE page_name = ? AND section_name = ?',
          [pageName, sectionName]
        );
        
        if (existing) {
          // Update existing section
          await runAsync(
            'UPDATE page_content SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE page_name = ? AND section_name = ?',
            [content, pageName, sectionName]
          );
        } else {
          // Insert new section
          await runAsync(
            'INSERT INTO page_content (page_name, section_name, content, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [pageName, sectionName, content]
          );
        }
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Page content saved successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error saving page content:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to save page content' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET({ url }) {
  try {
    const pageName = url.searchParams.get('page');
    
    if (!pageName) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Page name is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get all content sections for the page
    const sections = await allAsync(
      'SELECT section_name, content FROM page_content WHERE page_name = ?',
      [pageName]
    );
    
    const content = {};
    sections.forEach(section => {
      content[section.section_name] = section.content;
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      content 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error loading page content:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to load page content' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}