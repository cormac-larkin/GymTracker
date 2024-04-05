import { PgPool } from "../../postgres/pg-pool";

abstract class BaseDao {
  protected readonly connectionPool: PgPool;

  constructor(pgPool: PgPool) {
    this.connectionPool = pgPool;
  }
}

export default BaseDao;
