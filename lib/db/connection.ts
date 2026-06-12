import { D1Database } from '@cloudflare/workers-types';

let db: D1Database | null = null;

export function setDatabase(database: D1Database) {
  db = database;
}

export function getDatabase(): D1Database {
  if (!db) {
    throw new Error('Database not initialized. Call setDatabase first.');
  }
  return db;
}

export async function query(sql: string, params?: any[]) {
  const database = getDatabase();
  try {
    const result = await database.prepare(sql).bind(...(params || [])).all();
    return result;
  } catch (error) {
    console.error('[DB] Query error:', { sql, params, error });
    throw error;
  }
}

export async function run(sql: string, params?: any[]) {
  const database = getDatabase();
  try {
    const result = await database.prepare(sql).bind(...(params || [])).run();
    return result;
  } catch (error) {
    console.error('[DB] Run error:', { sql, params, error });
    throw error;
  }
}

export async function transaction<T>(
  callback: (db: D1Database) => Promise<T>
): Promise<T> {
  const database = getDatabase();
  try {
    await database.prepare('BEGIN TRANSACTION').run();
    const result = await callback(database);
    await database.prepare('COMMIT').run();
    return result;
  } catch (error) {
    await database.prepare('ROLLBACK').run();
    throw error;
  }
}

export async function createId(): Promise<string> {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
