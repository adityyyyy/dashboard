import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnproccessibleEntity } from "../exceptions/validation";
import { LogInSchema, SignUpSchema } from "../schemas/auth";
import { NotFoundException } from "../exceptions/not-found";
import { Admin } from "@prisma/client";
import { prismaClient } from "..";

export const signup = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  const validatedData = SignUpSchema.parse({ name, username, password });

  const existingAdmin: Admin | null = await prismaClient.admin.findFirst({
    where: { f_UserName: validatedData.username },
  });

  if (existingAdmin) {
    throw new BadRequestException(
      "User already exists!",
      ErrorCode.USERNAME_ALREADY_EXISTS,
    );
  }

  const admin: Admin = await prismaClient.admin.create({
    data: {
      f_Name: validatedData.name,
      f_UserName: validatedData.username,
      f_Pwd: hashSync(validatedData.password, 10),
    },
  });

  const jwtOptions = {
    expiresIn: "24h",
  };

  const token: string = jwt.sign(
    {
      adminId: admin?.f_Sno,
      username: admin?.f_UserName,
    },
    JWT_SECRET,
    jwtOptions,
  );

  res.status(200).json({
    success: true,
    admin: {
      adminId: admin.f_Sno,
      username: admin.f_UserName,
      name: admin.f_Name,
      auth_token: token,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const validatedData = LogInSchema.parse(req.body);

  let admin: Admin | null = await prismaClient.admin.findFirst({
    where: {
      f_UserName: validatedData.username,
    },
  });

  if (!admin) {
    throw new NotFoundException(
      "User does not exist!",
      ErrorCode.USERNAME_NOT_FOUND,
    );
  }

  if (!compareSync(validatedData.password, admin?.f_Pwd)) {
    throw new BadRequestException(
      "Wrong password!",
      ErrorCode.INCORRECT_PASSWORD,
    );
  }

  const jwtOptions = {
    expiresIn: "24h",
  };

  const token: string = jwt.sign(
    {
      adminId: admin?.f_Sno,
      username: admin?.f_UserName,
    },
    JWT_SECRET,
    jwtOptions,
  );

  res.status(200).json({
    success: true,
    admin: {
      adminId: admin.f_Sno,
      username: admin.f_UserName,
      name: admin.f_Name,
      auth_token: token,
    },
  });
};

export const me = (req: Request, res: Response) => {
  res.json(req.user);
};
