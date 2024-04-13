export type Environment = {
  APPLICATION_PORT?: number;
  DB_PORT?: number;
  DB_HOST?: string;
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
};

export type Exercise = {
  id: number;
  name: string;
  muscleGroup: string;
};

export type CreateExercisePayload = Omit<Exercise, "id">;

export enum MuscleGroup {
  Legs = "Legs",
  Biceps = "Biceps",
  Triceps = "Triceps",
  Chest = "Chest",
  Back = "Back",
  Core = "Core",
  Shoulders = "Shoulders",
}
