import { Request, Response } from "express";
import ExerciseService from "../service/exercise-service";

class ExerciseController {
  private readonly exerciseService: ExerciseService;

  constructor(exerciseService: ExerciseService) {
    this.exerciseService = exerciseService;
  }

  async getAllExercises(req: Request, res: Response) {
    const allExercises = await this.exerciseService.getAllExercises();
    return res.status(200).json(allExercises);
  }
}

export default ExerciseController;
