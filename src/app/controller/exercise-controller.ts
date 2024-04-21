import { Request, Response } from "express";
import ExerciseService from "../service/exercise-service";
import { CreateExercisePayload } from "../@types";

class ExerciseController {
  private readonly exerciseService: ExerciseService;

  constructor(exerciseService: ExerciseService) {
    this.exerciseService = exerciseService;
  }

  async getAllExercises(req: Request, res: Response) {
    const allExercises = await this.exerciseService.getAllExercises();
    return res.status(200).json(allExercises);
  }

  async getExerciseById(req: Request, res: Response) {
    const id = req.params.id;
    const exercise = await this.exerciseService.getExerciseById(id);
    return res.status(200).json(exercise);
  }

  async createExercise(req: Request, res: Response) {
    const payload: CreateExercisePayload = req.body;
    const newExercise = await this.exerciseService.createExercise(payload);
    return res.status(201).json(newExercise);
  }

  async deleteExercise(req: Request, res: Response) {
    const id = req.params.id;
    await this.exerciseService.deleteExercise(id);
    return res.sendStatus(204);
  }
}

export default ExerciseController;
