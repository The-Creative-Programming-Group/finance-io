import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from '@neondatabase/serverless';
import { env } from "../env";

// Configure neon to use WebSocket for better connection stability
neonConfig.webSocketConstructor = WebSocket;
neonConfig.useSecureWebSocket = true;
neonConfig.fetchConnectionCache = true;

const sql = neon(env.DATABASE_URL!);
export const db = drizzle(sql);