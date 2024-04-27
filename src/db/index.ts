import { env } from '@/lib/env';
import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqlite = new Database(env.DB_NAME);
sqlite.exec('PRAGMA journal_mode = WAL;');
// Ensure WAL mode is NOT persistent
// this prevents wal files from lingering after the database is closed
// sqlite.fileControl(constants.SQLITE_FCNTL_PERSIST_WAL, 0); (once 1.1.6 is released)

export const db = drizzle(sqlite);

export * as schema from './schema';
