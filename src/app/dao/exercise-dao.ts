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
}

export default ExerciseDao;
