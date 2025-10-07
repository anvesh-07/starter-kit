import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";

export class Database<TSchema extends Record<string, unknown>> {
  private pool: Sql<Record<any, any>>;
  public db: PostgresJsDatabase<TSchema> & {
    $client: postgres.Sql<{}>;
  }
  public schema: TSchema;

  constructor(databaseUrl: string, schema: TSchema) {
    this.pool = postgres(databaseUrl, { prepare: false }),
      this.db = drizzle({ client: this.pool, casing: "snake_case", schema }),

      this.schema = schema
  }
}