import { MockProxy, mock } from "jest-mock-extended";
import ExerciseService from "../service/exercise-service";
import ExerciseController from "./exercise-controller";
import { Request, Response } from "express";

let req: Request;
let res: Response;

let exerciseService: MockProxy<ExerciseService>;

let exerciseController: ExerciseController;

beforeEach(() => {
  req = { params: {}, body: {} } as unknown as Request;
  res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;

  exerciseService = mock<ExerciseService>();

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

  describe("getExerciseById", () => {
    it("should call the getExerciseById method of the ExerciseService with the correct id", async () => {
      req.params.id = "1";

      await exerciseController.getExerciseById(req, res);

      expect(exerciseService.getExerciseById).toHaveBeenCalledWith("1");
    });

    it("should build a response with a status of 200 and a body containing the value returned by the ExerciseService", async () => {
      req.params.id = "1";
      const testExercise = { id: 1, name: "Exercise 1", muscleGroup: "Legs" };

      exerciseService.getExerciseById.mockResolvedValue(testExercise);

      await exerciseController.getExerciseById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(testExercise);
    });
  });

  describe("createExercise", () => {
    it("should call the createExercise method of the ExerciseService with the received payload", async () => {
      req.body = { name: "Exercise 1", muscleGroup: "Legs" };

      await exerciseController.createExercise(req, res);

      expect(exerciseService.createExercise).toHaveBeenCalledWith(req.body);
    });

    it("should build a response with a status of 200 and a body containing the value returned by the ExerciseService", async () => {
      req.body = { name: "Exercise 1", muscleGroup: "Legs" };

      const testExercise = { id: 1, name: "Exercise 1", muscleGroup: "Legs" };
      exerciseService.createExercise.mockResolvedValue(testExercise);

      await exerciseController.createExercise(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(testExercise);
    });
  });
});
