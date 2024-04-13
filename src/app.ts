import express from "express";
import environment from "./config/environment";
import { exerciseRouter } from "./app/routes";
import { handleError } from "./app/middleware/handle-error";

const PORT = environment.APPLICATION_PORT;

const app = express();

app.use(express.json());

app.use("/exercises", exerciseRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`*** Server listening on port ${PORT} ***`);
});
