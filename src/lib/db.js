// Database adapter - automatically chooses PostgreSQL or SQLite based on environment

// Import both database modules
import * as postgresModule from './db-postgres.js';
import * as sqliteModule from './db-init.js';

// Choose the appropriate module based on environment
const usePostgres = process.env.POSTGRES_URL || process.env.VERCEL;
const dbModule = usePostgres ? postgresModule : sqliteModule;

// Re-export the chosen module's functions
export const { default: db, runAsync, getAsync, allAsync } = dbModule;
export default db;