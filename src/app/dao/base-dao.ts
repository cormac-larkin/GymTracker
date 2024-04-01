import connectionPool, { PgPool } from "../../postgres/pg-pool";

export abstract class BaseDao {
  protected readonly connectionPool: PgPool;

  constructor() {
    this.connectionPool = connectionPool;
  }
}
