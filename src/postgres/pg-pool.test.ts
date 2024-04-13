import { Pool } from "pg";
import { PgPool } from "./pg-pool";
import { Environment } from "../app/@types";

jest.mock("pg");

describe("PgPool", () => {
  let pgPool: PgPool;
  let poolSpy: jest.SpyInstance;

  const environment = {
    DB_USER: "testUser",
    DB_HOST: "testHost",
    DB_NAME: "testDatabase",
    DB_PASSWORD: "testPassword",
    DB_PORT: "testPort",
  } as unknown as Environment;

  beforeEach(() => {
    pgPool = new PgPool(environment);
    poolSpy = jest.spyOn(pgPool["pool"], "query"); // 'pool' is private, hence accessed using array notation
  });

  it("should create a pool instance with the provided environment variables", () => {
    expect(Pool).toHaveBeenCalledWith({
      user: "testUser",
      host: "testHost",
      database: "testDatabase",
      password: "testPassword",
      port: "testPort",
    });
  });

  it("should call pool.query with the provided queryConfig", async () => {
    const queryConfig = { text: "SELECT * FROM test_table" };

    await pgPool.query(queryConfig);

    expect(poolSpy).toHaveBeenCalledWith(queryConfig);
  });

  it("should return query result from pool.query", async () => {
    const queryConfig = { text: "SELECT * FROM test_table" };
    const mockQueryResult = { rows: [{ id: 1, name: "Test" }] };
    poolSpy.mockResolvedValueOnce(mockQueryResult);

    const result = await pgPool.query(queryConfig);

    expect(result).toEqual(mockQueryResult);
  });

  it("should throw an error if pool.query rejects", async () => {
    const errorMessage = "SQL Error";
    const queryConfig = { text: "SELECT * FROM test_table" };

    poolSpy.mockRejectedValueOnce(new Error(errorMessage));

    await expect(pgPool.query(queryConfig)).rejects.toThrow(errorMessage);
  });
});
