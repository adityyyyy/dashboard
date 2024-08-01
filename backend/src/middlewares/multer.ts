import multer, { FileFilterCallback, Multer } from "multer";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NextFunction, Request, Response } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback,
  ) {
    callback(null, "./employeeImages/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ) => {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    callback(
      new BadRequestException(
        "only .png, .jpg, .jpeg files are accepted",
        ErrorCode.UNPROCESSIBLE_ENTITY,
      ),
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

export const imageUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  upload(req, res, function (err) {
    next(err);
  });
};
