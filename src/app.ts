import express, { Request, Response } from "express";
import environment from "./config/environment";
import { exerciseRouter } from "./app/routes";

const app = express();
const PORT = environment.APPLICATION_PORT;

app.use("/exercises", exerciseRouter);

app.listen(PORT, async () => {
  console.log(`*** Server listening on port ${PORT} ***`);
});
