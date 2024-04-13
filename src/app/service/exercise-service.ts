import ExerciseDao from "../dao/exercise-dao";
import { NotFoundError } from "../errors/not-found-error";
import validateId from "../validation/validate-id";

class ExerciseService {
  private readonly exerciseDao: ExerciseDao;

  constructor(exerciseDao: ExerciseDao) {
    this.exerciseDao = exerciseDao;
  }

  async getAllExercises(): Promise<Exercise[]> {
    const allExercises = await this.exerciseDao.getAllExercises();
    return allExercises;
  }

  async getExerciseById(id: string): Promise<Exercise> {
    const parsedId = parseInt(id);

    validateId(parsedId);

    const exercise = await this.exerciseDao.getExerciseById(parsedId);

    if (!exercise) {
      throw new NotFoundError(`No exercise found with ID '${id}'`);
    }

    return exercise;
  }
}

export default ExerciseService;
