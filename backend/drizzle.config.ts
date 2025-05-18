import { defineConfig } from "drizzle-kit";
import { env } from "./src/lib/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    user: env.DATABASE_USER!,
    password: env.DATABASE_PASSWORD!,
    host: env.DATABASE_HOST!,
    port: parseInt(env.DATABASE_PORT!),
    database: env.DATABASE_NAME!,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
