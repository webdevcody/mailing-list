// This file is to get the migration to run in the Dockerfile right
// before the service runs.

import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql/driver";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const db = drizzle(client);

migrate(db, { migrationsFolder: ".." });
