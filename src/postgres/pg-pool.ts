import { Pool, QueryConfig, QueryResult } from "pg";
import environment from "../config/environment";

export class PgPool {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: environment.DB_USER,
      host: environment.DB_HOST,
      database: environment.DB_NAME,
      password: environment.DB_PASSWORD,
      port: environment.DB_PORT,
    });
  }

  async query(queryConfig: QueryConfig): Promise<QueryResult> {
    return await this.pool.query(queryConfig);
  }
}

export default new PgPool();
