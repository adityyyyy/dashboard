-- CreateEnum
CREATE TYPE "Designation" AS ENUM ('HR', 'Manager', 'Sales');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('MCA', 'BCA', 'BSC');

-- CreateTable
CREATE TABLE "t_Login" (
    "f_Sno" SERIAL NOT NULL,
    "f_Name" TEXT NOT NULL,
    "f_UserName" TEXT NOT NULL,
    "f_Pwd" TEXT NOT NULL,

    CONSTRAINT "t_Login_pkey" PRIMARY KEY ("f_Sno")
);

-- CreateTable
CREATE TABLE "t_Employee" (
    "f_Id" SERIAL NOT NULL,
    "f_Name" TEXT NOT NULL,
    "f_Email" TEXT NOT NULL,
    "f_Mobile" TEXT NOT NULL,
    "f_Image" TEXT,
    "f_Designation" "Designation" NOT NULL,
    "f_Gender" "Gender" NOT NULL,
    "f_Course" "Course" NOT NULL,
    "f_Createdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "f_Updatedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "t_Employee_pkey" PRIMARY KEY ("f_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_Login_f_UserName_key" ON "t_Login"("f_UserName");

-- CreateIndex
CREATE UNIQUE INDEX "t_Employee_f_Email_key" ON "t_Employee"("f_Email");
