import db, { getAsync } from '../../../lib/db.js';

export async function GET(context) {
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
    // Get counts from database using better-sqlite3 syntax
    const projectsResult = await getAsync('SELECT COUNT(*) as count FROM projects WHERE is_active = 1');
    const pagesResult = await getAsync('SELECT COUNT(DISTINCT page_name) as count FROM page_content');
    const filesResult = await getAsync('SELECT COUNT(*) as count FROM files');
    const resumeResult = await getAsync('SELECT COUNT(*) as count FROM resume_entries');

    const stats = {
      projects: { count: projectsResult?.count || 0 },
      pages: { count: pagesResult?.count || 0 },
      files: { count: filesResult?.count || 0 },
      resume: { count: resumeResult?.count || 0 }
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch stats',
      projects: { count: 0 },
      pages: { count: 0 },
      files: { count: 0 },
      resume: { count: 0 }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}