import express, { Express, NextFunction, Request, Response } from "express";
import http from "http";
import cors from "cors";
import routeRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { logger } from "./middlewares/logger";
import { PrismaClient } from "@prisma/client";
import { SERVER_PORT } from "./secrets";

const app: Express = express();

export const prismaClient = new PrismaClient({
  log: ["error"],
});

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  cors({
    origin: true,
    preflightContinue: false,
    credentials: true,
  }),
);

app.use(logger);

app.use("/employeeImages", express.static("employeeImages/"));

app.use("/api", routeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server OK.");
});

app.use(errorMiddleware);

http.createServer(app).listen(SERVER_PORT, () => {
  console.log(`server starter on: ${SERVER_PORT}`);
});
