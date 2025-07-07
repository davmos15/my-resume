import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// PostgreSQL database with Vercel Postgres
class PostgresDB {
  async initialize() {
    try {
      // Create tables if they don't exist
      await this.createTables();
      await this.seedDefaultData();
      console.log('PostgreSQL database initialized successfully');
    } catch (error) {
      console.error('Error initializing PostgreSQL database:', error);
      throw error;
    }
  }

  async createTables() {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Page content table
    await sql`
      CREATE TABLE IF NOT EXISTS page_content (
        id SERIAL PRIMARY KEY,
        page_name VARCHAR(255) NOT NULL,
        section_name VARCHAR(255) NOT NULL,
        content TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(page_name, section_name)
      )
    `;

    // Projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        emoji VARCHAR(10) DEFAULT '🚀',
        description TEXT,
        technologies TEXT,
        github_link VARCHAR(500),
        live_link VARCHAR(500),
        image_path VARCHAR(500),
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Resume sections table
    await sql`
      CREATE TABLE IF NOT EXISTS resume_sections (
        id SERIAL PRIMARY KEY,
        section_type VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        date_range VARCHAR(100),
        description TEXT,
        details TEXT,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at BIGINT NOT NULL,
        last_access BIGINT NOT NULL,
        expires_at BIGINT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `;

    // Contact messages table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT false
      )
    `;

    // Files table
    await sql`
      CREATE TABLE IF NOT EXISTS files (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        path VARCHAR(500) NOT NULL,
        size INTEGER,
        mimetype VARCHAR(100),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  }

  async seedDefaultData() {
    // Insert default admin user if not exists
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin', 10);
    
    try {
      await sql`
        INSERT INTO users (username, password) 
        VALUES (${adminUsername}, ${adminPasswordHash})
        ON CONFLICT (username) DO NOTHING
      `;
    } catch (error) {
      console.log('Admin user already exists or error:', error.message);
    }

    // Check if we need to seed projects
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    if (projectCount.rows[0].count === '0') {
      await sql`
        INSERT INTO projects (title, subtitle, description, technologies, display_order, emoji) 
        VALUES (
          'Welcome Project',
          'Your first project',
          'This is a placeholder project. Update it from the admin panel.',
          'HTML, CSS, JavaScript',
          0,
          '🎉'
        )
      `;
    }
  }

}

// Create singleton instance
const db = new PostgresDB();

// Initialize database on first import
db.initialize().catch(console.error);

// Helper functions for compatibility with existing code
export const runAsync = async (query, params = []) => {
  try {
    // Convert SQLite-style queries to PostgreSQL
    const pgQuery = query.replace(/\?/g, (match, offset, string) => {
      const paramIndex = (string.substring(0, offset).match(/\?/g) || []).length + 1;
      return `$${paramIndex}`;
    });
    
    const result = await sql.query(pgQuery, params);
    return {
      id: result.rows[0]?.id,
      changes: result.rowCount,
      lastInsertRowid: result.rows[0]?.id
    };
  } catch (error) {
    console.error('runAsync error:', error);
    throw error;
  }
};

export const getAsync = async (query, params = []) => {
  try {
    // Convert SQLite-style queries to PostgreSQL
    const pgQuery = query.replace(/\?/g, (match, offset, string) => {
      const paramIndex = (string.substring(0, offset).match(/\?/g) || []).length + 1;
      return `$${paramIndex}`;
    });
    
    const result = await sql.query(pgQuery, params);
    return result.rows[0] || null;
  } catch (error) {
    console.error('getAsync error:', error);
    throw error;
  }
};

export const allAsync = async (query, params = []) => {
  try {
    // Convert SQLite-style queries to PostgreSQL
    const pgQuery = query.replace(/\?/g, (match, offset, string) => {
      const paramIndex = (string.substring(0, offset).match(/\?/g) || []).length + 1;
      return `$${paramIndex}`;
    });
    
    const result = await sql.query(pgQuery, params);
    return result.rows;
  } catch (error) {
    console.error('allAsync error:', error);
    throw error;
  }
};

export default db;