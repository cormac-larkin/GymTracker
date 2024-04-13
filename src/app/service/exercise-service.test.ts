import { MockProxy } from "jest-mock-extended";
import ExerciseDao from "../dao/exercise-dao";
import ExerciseService from "../service/exercise-service";
import { mock } from "jest-mock-extended";

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
});
