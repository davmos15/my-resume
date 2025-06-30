import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use /tmp directory for Vercel serverless
const dbPath = process.env.VERCEL 
  ? '/tmp/portfolio.db' 
  : path.join(__dirname, '../../database/portfolio.db');

// Initialize database
let db;

function initializeDatabase() {
  // Create directory if it doesn't exist
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS page_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_name TEXT NOT NULL,
      section_name TEXT NOT NULL,
      content TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(page_name, section_name)
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      emoji TEXT DEFAULT '🚀',
      description TEXT,
      technologies TEXT,
      github_link TEXT,
      live_link TEXT,
      image_path TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      path TEXT NOT NULL,
      size INTEGER,
      mimetype TEXT,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resume_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_type TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      date_range TEXT,
      description TEXT,
      details TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resume_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      organization TEXT,
      date TEXT,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_read BOOLEAN DEFAULT 0
    );
  `);

  // Insert default admin user if not exists
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin', 10);
  
  const stmt = db.prepare('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)');
  stmt.run(adminUsername, adminPasswordHash);

  // Insert some default content if tables are empty
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  if (projectCount.count === 0) {
    db.prepare(`
      INSERT INTO projects (title, subtitle, description, technologies, display_order, emoji) 
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'Welcome Project',
      'Your first project',
      'This is a placeholder project. Update it from the admin panel.',
      'HTML, CSS, JavaScript',
      0,
      '🎉'
    );
  }

  return db;
}

// Initialize on first import
if (!db) {
  db = initializeDatabase();
}

// Helper functions
const runAsync = async (sql, params = []) => {
  if (!db) db = initializeDatabase();
  const stmt = db.prepare(sql);
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return stmt.all(params);
  } else {
    const result = stmt.run(params);
    return { id: result.lastInsertRowid, changes: result.changes };
  }
};

const getAsync = async (sql, params = []) => {
  if (!db) db = initializeDatabase();
  const stmt = db.prepare(sql);
  return stmt.get(params);
};

const allAsync = async (sql, params = []) => {
  if (!db) db = initializeDatabase();
  const stmt = db.prepare(sql);
  return stmt.all(params);
};

const db$1 = db;

export { allAsync as a, db$1 as d, getAsync as g, runAsync as r };
