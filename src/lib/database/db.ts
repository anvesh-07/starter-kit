import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/database/schema";
import {
  NILEDB_HOST,
  NILEDB_NAME,
  NILEDB_PASSWORD,
  NILEDB_PORT,
  NILEDB_USER,
} from "../env";

const pool = new Pool({
  user: NILEDB_USER,
  password: NILEDB_PASSWORD,
  host: NILEDB_HOST,
  port: Number(NILEDB_PORT),
  database: NILEDB_NAME,
  ssl: false,
});

export const db = drizzle({ client: pool, casing: "snake_case", schema });
