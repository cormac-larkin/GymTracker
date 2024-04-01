import { Request, Response, Router } from "express";
import { ExerciseController } from "../controller/exercise-controller";
import { ExerciseDao } from "../dao/exercise-dao";
import { ExerciseService } from "../service/exercise-service";

const router = Router();

const exerciseDao = new ExerciseDao();
const exerciseService = new ExerciseService(exerciseDao);
const exerciseController = new ExerciseController(exerciseService);

router.get("/", async (req: Request, res: Response) => {
  return exerciseController.getAllExercises(req, res);
});

export { router as exerciseRouter };
