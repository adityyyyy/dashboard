import axios from "axios";
import EmployeeForm from "../../components/employee-form";
import { EmployeeProp } from "../../definitions";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function Create() {
  const navigate = useNavigate();

  const onCreate = (employee: EmployeeProp) => {
    axios
      .post("http://localhost:3030/api/admin/create", employee, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data));

    navigate("/employees");
  };

  return (
    <>
      <Row className="fs-5">
        <Col xs="auto">
          <Link to="/employees">Back</Link>
        </Col>
        <Col className="text-center">Create Employee</Col>
      </Row>
      <Row>
        <EmployeeForm onSubmit={onCreate} />
      </Row>
    </>
  );
}
