import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./auth";

const routeRouter: Router = Router();

routeRouter.use("/admin", adminRouter);

routeRouter.use("/auth", authRouter);

export default routeRouter;
