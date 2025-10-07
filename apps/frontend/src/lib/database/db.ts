import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { DATABASE_URL } from '../env';
import * as schema from '../../../../../packages/database/src/lib/schema/schema';


const connectionString = process.env.DATABASE_URL

const client = postgres(DATABASE_URL, { prepare: false })

export const db = drizzle({client, casing: "snake_case", schema});

