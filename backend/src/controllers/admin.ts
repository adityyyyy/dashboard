import { Request, Response } from "express";
import { prismaClient } from "..";
import {
  EmployeeCreateSchema,
  EmployeeEditSchema,
  EmployeeFindSchema,
} from "../schemas/admin";
import { Employee } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";

export const createEmployee = async (req: Request, res: Response) => {
  const validatedData = EmployeeCreateSchema.parse(req.body);

  let image: string = "";

  if (req.file) {
    image = req.file.path;
  }

  console.log(req.file);

  const existingEmail: Employee | null = await prismaClient.employee.findFirst({
    where: {
      f_Email: validatedData.email,
    },
  });

  if (existingEmail) {
    throw new BadRequestException(
      "Email already registered",
      ErrorCode.EMAIL_ALREADY_EXISTS,
    );
  }

  const newEmployee: Employee | null = await prismaClient.employee.create({
    data: {
      f_Name: validatedData.name,
      f_Email: validatedData.email,
      f_Mobile: validatedData.mobile,
      f_Designation: validatedData.designation,
      f_Gender: validatedData.gender,
      f_Course: validatedData.course,
      f_Image: image,
    },
  });

  res.status(201).json(newEmployee);
};

export const editEmployee = async (req: Request, res: Response) => {
  const validatedData = EmployeeEditSchema.parse(req.body);

  let editData = {};

  if (validatedData.name) {
    editData = { ...editData, f_Name: validatedData.name };
  }
  if (validatedData.email) {
    editData = { ...editData, f_Email: validatedData.name };
  }
  if (validatedData.mobile) {
    editData = { ...editData, f_Mobile: validatedData.name };
  }
  if (validatedData.designation) {
    editData = { ...editData, f_Designation: validatedData.name };
  }
  if (validatedData.gender) {
    editData = { ...editData, f_Gender: validatedData.name };
  }
  if (validatedData.course) {
    editData = { ...editData, f_Course: validatedData.name };
  }
  if (req.file) {
    editData = { ...editData, f_Image: req.file.path };
  }

  const updatedEmployee: Employee | null = await prismaClient.employee.update({
    where: {
      f_Id: +req.params.id,
    },
    data: editData,
  });

  res.status(200).json(updatedEmployee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const validatedData = EmployeeFindSchema.parse(req.body);

  await prismaClient.employee.delete({
    where: {
      f_Id: validatedData.id,
    },
  });

  res.status(204).json({});
};

export const listEmployee = async (req: Request, res: Response) => {
  const count: number = await prismaClient.employee.count();

  const employees: Employee[] = await prismaClient.employee.findMany();

  res.status(200).json({
    count: count,
    employees: employees,
  });
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const employee = await prismaClient.employee.findFirst({
    where: {
      f_Id: +id,
    },
  });

  if (!employee) {
    throw new NotFoundException(
      "Employee not found",
      ErrorCode.EMPLOYEE_NOT_FOUND,
    );
  }

  res.json(employee);
};
