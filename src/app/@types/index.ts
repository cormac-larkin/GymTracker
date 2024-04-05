type Environment = {
  APPLICATION_PORT?: number;
  DB_PORT?: number;
  DB_HOST?: string;
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
};

type Exercise = {
  id: number;
  name: string;
  muscleGroup: string;
};
