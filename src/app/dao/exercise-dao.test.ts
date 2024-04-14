import { MockProxy } from "jest-mock-extended";
import ExerciseDao from "../dao/exercise-dao";
import { mock } from "jest-mock-extended";
import { PgPool } from "../../postgres/pg-pool";
import { QueryResult } from "pg";
import { MuscleGroup } from "../@types";

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

  describe("getExerciseById", () => {
    it("should query the database with the correct SQL query", async () => {
      pgPool.query.mockResolvedValue(resultSet as QueryResult);

      await exerciseDao.getExerciseById(1);

      expect(pgPool.query).toHaveBeenCalledWith({
        text: `SELECT
            exercise_id AS id,
            exercise.name AS name,
            muscle_group.name AS \"muscleGroup\" 
            FROM 
            exercise
            INNER JOIN
            muscle_group
            USING (muscle_group_id)
            WHERE exercise_id = $1`,
        values: [1],
      });
    });

    it("should return the first value returned by the database query", async () => {
      resultSet.rows = [{ id: 1, name: "Exercise 1", muscleGroup: "Legs" }];

      pgPool.query.mockResolvedValue(resultSet as QueryResult);

      const returnValue = await exerciseDao.getExerciseById(1);

      expect(returnValue).toStrictEqual(resultSet.rows[0]);
    });

    it("should throw error if database error occurs", async () => {
      const error = new Error("Database query failed");
      pgPool.query.mockRejectedValue(error);

      await expect(exerciseDao.getExerciseById(1)).rejects.toThrow(error);
    });
  });

  describe("createExercise", () => {
    it("should query the database with the correct SQL queries", async () => {
      resultSet.rows = [{ id: 1, name: "Exercise 1", muscleGroup: "Legs" }];
      pgPool.query.mockResolvedValue(resultSet as QueryResult);

      await exerciseDao.createExercise({ name: "Pullup", muscleGroup: "Back" });

      expect(pgPool.query).toHaveBeenCalledWith({
        text: `INSERT INTO
              exercise 
              (name, muscle_group_id)
              VALUES
              ($1, (SELECT muscle_group_id FROM muscle_group WHERE name = $2))
              RETURNING exercise_id`,
        values: ["Pullup", "Back"],
      });
    });

    it("should return the newly created Exercise", async () => {
      // Mock first query (to insert the new Exercise)
      const firstQueryResult = { rows: [{ exercise_id: 1 }] };
      pgPool.query.mockResolvedValueOnce(firstQueryResult as QueryResult);

      // Mock second query (to retrieve the newly inserted Exercise)
      const secondQueryResult = {
        rows: [{ id: 1, name: "Pullup", muscleGroup: "Back" }],
      };
      pgPool.query.mockResolvedValue(secondQueryResult as QueryResult);

      const returnValue = await exerciseDao.createExercise({
        name: "Pullup",
        muscleGroup: "Back",
      });

      expect(returnValue).toStrictEqual({
        id: 1,
        name: "Pullup",
        muscleGroup: "Back",
      });
    });

    it("should throw error if database error occurs", async () => {
      const error = new Error("Database query failed");
      pgPool.query.mockRejectedValue(error);

      const submittedExercise = { name: "Pullup", muscleGroup: "Back" };

      await expect(
        exerciseDao.createExercise(submittedExercise)
      ).rejects.toThrow(error);
    });
  });

  describe("deleteExercise", () => {
    it("should query the database with the correct SQL query", async () => {
      await exerciseDao.deleteExercise(1);

      expect(pgPool.query).toHaveBeenCalledWith({
        text: "DELETE FROM exercise WHERE exercise_id = $1",
        values: [1],
      });
    });

    it("should throw error if database error occurs", async () => {
      const error = new Error("Database query failed");
      pgPool.query.mockRejectedValue(error);

      await expect(exerciseDao.deleteExercise(1)).rejects.toThrow(error);
    });
  });
});
