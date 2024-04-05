import { MockProxy } from "jest-mock-extended";
import ExerciseDao from "../dao/exercise-dao";
import ExerciseService from "../service/exercise-service";
import ExerciseController from "./exercise-controller";
import { Request, Response } from "express";
import { mock } from "jest-mock-extended";

let req: Request;
let res: Response;

let exerciseDao: MockProxy<ExerciseDao>;
let exerciseService: MockProxy<ExerciseService>;

let exerciseController: ExerciseController;

beforeEach(() => {
  req = {} as unknown as Request;
  res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;

  exerciseDao = mock<ExerciseDao>();
  exerciseService = mock<ExerciseService>(exerciseDao);

  exerciseController = new ExerciseController(exerciseService);
});

describe("ExerciseController", () => {
  describe("getAllExercises", () => {
    it("should call the getAllExercises method of the ExerciseService", async () => {
      await exerciseController.getAllExercises(req, res);

      expect(exerciseService.getAllExercises).toHaveBeenCalled();
    });

    it("should build a response with a status of 200 and a body containing the value returned by the ExerciseService", async () => {
      const testExercises = [
        { id: 1, name: "Exercise 1", muscleGroup: "Legs" },
        { id: 2, name: "Exercise 2", muscleGroup: "Back" },
      ];

      exerciseService.getAllExercises.mockResolvedValue(testExercises);

      await exerciseController.getAllExercises(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(testExercises);
    });
  });
});
