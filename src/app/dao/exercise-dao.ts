import { BaseDao } from "./base-dao";

export class ExerciseDao extends BaseDao {
  public async getAllExercises(): Promise<Exercise[]> {
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
}
