import { NILEDB_HOST, NILEDB_NAME, NILEDB_PASSWORD, NILEDB_PORT, NILEDB_USER } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    user: NILEDB_USER,
    password: NILEDB_PASSWORD,
    host: NILEDB_HOST,
    port: Number(NILEDB_PORT),
    database: NILEDB_NAME,
    ssl: false
  },
});
