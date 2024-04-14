import { CreateExercisePayload, MuscleGroup } from "../@types";
import { ValidationError } from "../errors";

const MAX_NAME_LENGTH = 50;

const validateExercise = (exercise: CreateExercisePayload) => {
  const { name, muscleGroup } = exercise;

  if (!name || name.length > MAX_NAME_LENGTH) {
    throw new ValidationError("Exercise name must contain 1-50 characters");
  }

  if (!muscleGroup || !(muscleGroup in MuscleGroup)) {
    throw new ValidationError(
      "Muscle group must be one of the following values: " +
        Object.values(MuscleGroup).join(" | ")
    );
  }
};

export { validateExercise };
