import ExerciseDao from "../dao/exercise-dao";

class ExerciseService {
  private readonly exerciseDao: ExerciseDao;

  constructor(exerciseDao: ExerciseDao) {
    this.exerciseDao = exerciseDao;
  }

  async getAllExercises(): Promise<Exercise[]> {
    const allExercises = await this.exerciseDao.getAllExercises();
    return allExercises;
  }
}

export default ExerciseService;
