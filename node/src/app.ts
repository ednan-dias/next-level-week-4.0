import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { routes } from "./routes";
import createConnection from "./database";
import { AppError } from "./errors/AppError";

createConnection();
const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  });
});

export { app };
