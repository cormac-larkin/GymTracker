import { MockProxy, mock } from "jest-mock-extended";
import ExerciseDao from "../dao/exercise-dao";
import ExerciseService from "../service/exercise-service";
import { CreateExercisePayload } from "../@types";

let exerciseDao: MockProxy<ExerciseDao>;
let exerciseService: ExerciseService;

beforeEach(() => {
  exerciseDao = mock<ExerciseDao>();
  exerciseService = new ExerciseService(exerciseDao);
});

describe("ExerciseService", () => {
  describe("getAllExercises", () => {
    it("should call the getAllExercises method of the ExerciseDao", async () => {
      await exerciseService.getAllExercises();

      expect(exerciseDao.getAllExercises).toHaveBeenCalled();
    });

    it("should return the value returned by the ExerciseDao", async () => {
      const testExercises = [
        { id: 1, name: "Exercise 1", muscleGroup: "Legs" },
        { id: 2, name: "Exercise 2", muscleGroup: "Back" },
      ];

      exerciseDao.getAllExercises.mockResolvedValue(testExercises);

      const result = await exerciseService.getAllExercises();

      expect(result).toStrictEqual(testExercises);
    });
  });

  describe("getExerciseById", () => {
    it("should call the getExerciseById method of the ExerciseDao with the correct value", async () => {
      const testExercise = { id: 1, name: "Exercise 1", muscleGroup: "Legs" };
      exerciseDao.getExerciseById.mockResolvedValue(testExercise);

      await exerciseService.getExerciseById("1");

      expect(exerciseDao.getExerciseById).toHaveBeenCalledWith(1);
    });

    it("should return the value returned by the ExerciseDao", async () => {
      const testExercise = { id: 1, name: "Exercise 1", muscleGroup: "Legs" };

      exerciseDao.getExerciseById.mockResolvedValue(testExercise);

      const result = await exerciseService.getExerciseById("1");

      expect(result).toStrictEqual(testExercise);
    });

    it("should throw an error if called with non-existent ID", async () => {
      exerciseDao.getExerciseById.mockResolvedValue(undefined as any);

      await expect(exerciseService.getExerciseById("999999")).rejects.toThrow();
    });

    it.each(["-1", "-5", true, "invalid", "", null])(
      "should throw an error for invalid argument: %s",
      async (input: any) => {
        await expect(exerciseService.getExerciseById(input)).rejects.toThrow();
      }
    );
  });

  describe("createExercise", () => {
    it("should call the createExercise method of the ExerciseDao", async () => {
      const submittedExercise = { name: "Pullup", muscleGroup: "Back" };
      await exerciseService.createExercise(submittedExercise);

      expect(exerciseDao.createExercise).toHaveBeenCalledWith(
        submittedExercise
      );
    });

    it("should return the newly created exercise object", async () => {
      const submittedExercise = { name: "Pullup", muscleGroup: "Back" };

      exerciseDao.createExercise.mockResolvedValue({
        id: 1,
        ...submittedExercise,
      });

      const result = await exerciseService.createExercise(submittedExercise);

      expect(result).toStrictEqual({
        id: 1,
        ...submittedExercise,
      });
    });

    it("should throw an error for missing 'name' property", async () => {
      const invalidExercise = {
        name: undefined,
        muscleGroup: "Back",
      } as unknown as CreateExercisePayload;

      await expect(
        exerciseService.createExercise(invalidExercise)
      ).rejects.toThrow();
    });

    it("should throw an error if 'name' too long", async () => {
      const invalidExercise = {
        name: "A".repeat(51),
        muscleGroup: "Back",
      } as unknown as CreateExercisePayload;

      await expect(
        exerciseService.createExercise(invalidExercise)
      ).rejects.toThrow();
    });

    it("should throw an error for missing 'muscleGroup' property", async () => {
      const invalidExercise = {
        name: "Pullup",
        muscleGroup: undefined,
      } as unknown as CreateExercisePayload;

      await expect(
        exerciseService.createExercise(invalidExercise)
      ).rejects.toThrow();
    });

    it("should throw an error if 'muscleGroup' is not a valid Muscle Group", async () => {
      const invalidExercise = {
        name: "Pullup",
        muscleGroup: "Invalid",
      } as unknown as CreateExercisePayload;

      await expect(
        exerciseService.createExercise(invalidExercise)
      ).rejects.toThrow();
    });
  });
});
