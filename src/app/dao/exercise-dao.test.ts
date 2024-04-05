import { MockProxy } from "jest-mock-extended";
import ExerciseDao from "../dao/exercise-dao";
import { mock } from "jest-mock-extended";
import { PgPool } from "../../postgres/pg-pool";
import { QueryResult } from "pg";

let pgPool: MockProxy<PgPool>;
let exerciseDao: ExerciseDao;

let resultSet: Partial<QueryResult>;

beforeEach(() => {
  pgPool = mock<PgPool>();
  exerciseDao = new ExerciseDao(pgPool);

  resultSet = { rows: [] };
});

describe("ExerciseDao", () => {
  describe("getAllExercises", () => {
    it("should query the database with the correct SQL query", async () => {
      pgPool.query.mockResolvedValue(resultSet as QueryResult);

      await exerciseDao.getAllExercises();

      expect(pgPool.query).toHaveBeenCalledWith({
        text: `SELECT
            exercise_id AS id,
            exercise.name AS name,
            muscle_group.name AS \"muscleGroup\" 
            FROM 
            exercise
            INNER JOIN
            muscle_group
            USING (muscle_group_id)`,
      });
    });

    it("should return the value returned by the database query", async () => {
      resultSet.rows = [
        { id: 1, name: "Exercise 1", muscleGroup: "Legs" },
        { id: 2, name: "Exercise 2", muscleGroup: "Back" },
      ];

      pgPool.query.mockResolvedValue(resultSet as QueryResult);

      const returnValue = await exerciseDao.getAllExercises();

      expect(returnValue).toStrictEqual(resultSet.rows);
    });

    it("should throw error if database error occurs", async () => {
      const error = new Error("Database query failed");
      pgPool.query.mockRejectedValue(error);

      await expect(exerciseDao.getAllExercises()).rejects.toThrow(error);
    });
  });
});
