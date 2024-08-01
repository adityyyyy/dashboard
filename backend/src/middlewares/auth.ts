import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    next(
      new UnauthorizedException(
        "Unauthorized Access",
        ErrorCode.UNAUTHORIZED_ACCESS,
      ),
    );
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await prismaClient.admin.findFirst({
      where: {
        f_Sno: payload.adminId,
      },
    });

    if (!user) {
      next(
        new UnauthorizedException(
          "Unauthorized Access",
          ErrorCode.UNAUTHORIZED_ACCESS,
        ),
      );
    } else {
      req.user = user;
    }

    next();
  } catch (err: any) {
    next(
      new UnauthorizedException(
        "Unauthorized Access",
        ErrorCode.UNAUTHORIZED_ACCESS,
      ),
    );
  }
};
