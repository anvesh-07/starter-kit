import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
export class Database {
    pool;
    db;
    schema;
    constructor(databaseUrl, schema) {
        this.pool = postgres(databaseUrl, { prepare: false }),
            this.db = drizzle({ client: this.pool, casing: "snake_case", schema }),
            this.schema = schema;
    }
}
//# sourceMappingURL=db.js.map