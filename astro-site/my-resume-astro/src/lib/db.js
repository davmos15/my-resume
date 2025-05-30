// Database connection module
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database
const dbPath = path.join(__dirname, '../../database/portfolio.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Helper functions to match the Express app's async interface
export const runAsync = async (sql, params = []) => {
    const stmt = db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
        return stmt.all(params);
    } else {
        const result = stmt.run(params);
        return { id: result.lastInsertRowid, changes: result.changes };
    }
};

export const getAsync = async (sql, params = []) => {
    const stmt = db.prepare(sql);
    return stmt.get(params);
};

export const allAsync = async (sql, params = []) => {
    const stmt = db.prepare(sql);
    return stmt.all(params);
};

export default db;