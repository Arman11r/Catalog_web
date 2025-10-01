import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle, type NeonDatabase } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

let _db: NeonDatabase<typeof schema> | undefined;
let _pool: Pool | undefined;

if (process.env.DATABASE_URL) {
  _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  _db = drizzle({ client: _pool, schema });
} else {
  // Do not throw at import time; allow memory-only storage usage.
  console.warn("DATABASE_URL not set. Using in-memory storage. Database features are disabled.");
}

export const pool = _pool as unknown as Pool;
export const db = _db as unknown as NeonDatabase<typeof schema>;
