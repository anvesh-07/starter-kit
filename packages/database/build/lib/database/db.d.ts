import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
export declare class Database<TSchema extends Record<string, unknown>> {
    private pool;
    db: PostgresJsDatabase<TSchema> & {
        $client: postgres.Sql<{}>;
    };
    schema: TSchema;
    constructor(databaseUrl: string, schema: TSchema);
}
//# sourceMappingURL=db.d.ts.map