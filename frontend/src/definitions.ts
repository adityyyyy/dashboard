export type Designation = "HR" | "Manager" | "Sales";

export type Gender = "M" | "F";

export type Course = "MCA" | "BCA" | "BSC";

export type Employee = {
  f_Id: number;
  f_Name: string;
  f_Email: string;
  f_Mobile: string;
  f_Image: string;
  f_Gender: Gender;
  f_Course: Course;
  f_Designation: Designation;
  f_Createdate: Date;
};

export type Admin = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type AuthData = {
  success: boolean;
  admin: {
    adminId: number;
    name: string;
    username: string;
    auth_token: string;
  };
};

export type EmployeeProp = {
  name: string;
  email: string;
  mobile: string;
  image?: File;
  gender: string;
  course: string;
  designation: string;
};
