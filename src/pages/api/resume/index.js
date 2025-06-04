import { allAsync, runAsync } from '../../../lib/db.js';

export async function GET(context) {
  try {
    const sections = await allAsync('SELECT * FROM resume_sections WHERE is_active = 1 ORDER BY section_type, display_order');
    
    return new Response(JSON.stringify(sections), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Resume API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch resume sections' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(context) {
  // Check authentication
  const session = context.cookies.get('session');
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const data = await context.request.json();
    const { section_type, title, subtitle, date_range, description, details, display_order, is_active } = data;

    const result = await runAsync(
      `INSERT INTO resume_sections (section_type, title, subtitle, date_range, description, details, display_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [section_type, title, subtitle, date_range, description, details, display_order || 0, is_active ?? 1]
    );

    return new Response(JSON.stringify({ 
      message: 'Resume section created successfully',
      id: result.id 
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Resume create error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create resume section' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}