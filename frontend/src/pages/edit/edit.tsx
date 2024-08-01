import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../../components/employee-form";
import { Employee, EmployeeProp } from "../../definitions";
import axios from "axios";
import {  useState } from "react";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>();

  (async () => {
    axios
      .get(`http://localhost:3030/api/admin/employee/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.log(error));
  })();

  const onEdit = (data: EmployeeProp) => {
    axios.post(`http://localhost:3030/api/admin/edit/${id}`, data);

    navigate("/employees");
  };

  return (
    <>
      {employee && (
        <EmployeeForm
          onSubmit={onEdit}
          name={employee.f_Name}
          email={employee.f_Email}
          mobile={employee.f_Mobile}
          gender={employee.f_Gender}
          designation={employee.f_Designation}
          course={employee.f_Course}
        />
      )}
    </>
  );
}
