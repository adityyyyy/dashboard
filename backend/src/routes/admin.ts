import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorHandler";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployeeById,
  listEmployee,
} from "../controllers/admin";
import { imageUpload } from "../middlewares/multer";

const adminRouter: Router = Router();

adminRouter.post("/create", [imageUpload], errorHandler(createEmployee));

adminRouter.put("/edit/:id", [imageUpload], errorHandler(editEmployee));

adminRouter.delete("/delete", errorHandler(deleteEmployee));

adminRouter.get("/employees", errorHandler(listEmployee));

adminRouter.get("/employee/:id", errorHandler(getEmployeeById));

export default adminRouter;
