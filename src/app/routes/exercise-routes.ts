import { NextFunction, Request, Response, Router } from "express";
import ExerciseController from "../controller/exercise-controller";
import ExerciseDao from "../dao/exercise-dao";
import ExerciseService from "../service/exercise-service";
import connectionPool from "../../postgres/pg-pool";

const router = Router();

const exerciseDao = new ExerciseDao(connectionPool);
const exerciseService = new ExerciseService(exerciseDao);
const exerciseController = new ExerciseController(exerciseService);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await exerciseController.getAllExercises(req, res);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await exerciseController.getExerciseById(req, res);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await exerciseController.createExercise(req, res);
  } catch (err) {
    return next(err);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await exerciseController.deleteExercise(req, res);
    } catch (err) {
      return next(err);
    }
  }
);

export { router as exerciseRouter };
