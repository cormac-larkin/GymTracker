import { CreateExercisePayload, Exercise } from "../@types";
import BaseDao from "./base-dao";

class ExerciseDao extends BaseDao {
  async getAllExercises(): Promise<Exercise[]> {
    const result = await this.connectionPool.query({
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

    return result.rows as Exercise[];
  }

  async getExerciseById(id: number): Promise<Exercise> {
    const result = await this.connectionPool.query({
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
      values: [id],
    });

    return result.rows[0] as Exercise;
  }

  async createExercise(exercise: CreateExercisePayload): Promise<Exercise> {
    const { name, muscleGroup } = exercise;

    const result = await this.connectionPool.query({
      text: `INSERT INTO
              exercise 
              (name, muscle_group_id)
              VALUES
              ($1, (SELECT muscle_group_id FROM muscle_group WHERE name = $2))
              RETURNING exercise_id`,
      values: [name, muscleGroup],
    });

    const createdExerciseId = result.rows[0].exercise_id as number;

    // Get the formatted 'Exercise' object from 'getExerciseById'
    const createdExercise = await this.getExerciseById(createdExerciseId);

    return createdExercise as Exercise;
  }

  async deleteExercise(id: number): Promise<void> {
    await this.connectionPool.query({
      text: "DELETE FROM exercise WHERE exercise_id = $1",
      values: [id],
    });
  }
}

export default ExerciseDao;
