import { g as getAsync, r as runAsync } from '../../../chunks/db-init_BmxtR14B.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET(context) {
  const { id } = context.params;
  
  try {
    const section = await getAsync('SELECT * FROM resume_sections WHERE id = ?', [id]);
    
    if (!section) {
      return new Response(JSON.stringify({ error: 'Resume section not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(section), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Resume get error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch resume section' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

async function PUT(context) {
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

  const { id } = context.params;
  
  try {
    const data = await context.request.json();
    const { section_type, title, subtitle, date_range, description, details, display_order, is_active } = data;

    await runAsync(
      `UPDATE resume_sections 
       SET section_type = ?, title = ?, subtitle = ?, date_range = ?, description = ?, 
           details = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [section_type, title, subtitle, date_range, description, details, display_order, is_active, id]
    );

    return new Response(JSON.stringify({ message: 'Resume section updated successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Resume update error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update resume section' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

async function DELETE(context) {
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

  const { id } = context.params;
  
  try {
    await runAsync('DELETE FROM resume_sections WHERE id = ?', [id]);

    return new Response(JSON.stringify({ message: 'Resume section deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Resume delete error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete resume section' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
