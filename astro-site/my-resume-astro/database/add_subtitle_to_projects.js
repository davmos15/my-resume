import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new sqlite3.verbose().Database(path.join(__dirname, 'portfolio.db'));

db.serialize(() => {
    // Add subtitle column to projects table
    db.run(`ALTER TABLE projects ADD COLUMN subtitle TEXT`, (err) => {
        if (err) {
        } else {
        }
    });
});

db.close((err) => {
    if (err) {
    } else {
    }
});