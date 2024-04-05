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
});
