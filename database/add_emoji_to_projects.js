import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Database } = sqlite3.verbose();
const db = new Database(path.join(__dirname, 'portfolio.db'));

// Add emoji column to projects table
db.serialize(() => {
    db.run(`ALTER TABLE projects ADD COLUMN emoji TEXT DEFAULT '🚀'`, (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                } else {
            }
        } else {
        }
    });

    // Update existing projects with default emojis
    const projectEmojis = {
        'NetSuite': '💼',
        'Onboarding & Offboarding': '🔄',
        'IT Management': '🖥️'
    };

    Object.entries(projectEmojis).forEach(([title, emoji]) => {
        db.run(`UPDATE projects SET emoji = ? WHERE title = ?`, [emoji, title], (err) => {
            if (err) {
            } else {
            }
        });
    });

    // Close the database connection after all operations
    setTimeout(() => {
        db.close((err) => {
            if (err) {
            } else {
            }
        });
    }, 1000);
});