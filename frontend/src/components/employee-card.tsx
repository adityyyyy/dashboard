import { Button, Col, Row } from "react-bootstrap";
import { Employee } from "../definitions";
import { Link } from "react-router-dom";

type EmployeeCardProp = {
  employee: Employee;
  onDelete: (id: number) => void;
};

export default function EmployeeCard({ employee, onDelete }: EmployeeCardProp) {
  const handleDelete = () => {
    onDelete(employee.f_Id);
  };

  return (
    <tr className="align-items-center">
      <td className="col-1">{employee.f_Id}</td>
      <td>
        <img
          src={`http:localhost:3030/${employee.f_Image}`}
          alt=""
          className="rounded-circle"
        />
      </td>
      <td>{employee.f_Name}</td>
      <td>{employee.f_Email}</td>
      <td>{employee.f_Mobile}</td>
      <td>{employee.f_Gender}</td>
      <td>{employee.f_Designation}</td>
      <td>{employee.f_Course}</td>
      <td>{employee.f_Createdate.toString()}</td>
      <td>
        <Row>
          <Col>
            <Link to={`/employee/${employee.f_Id}/edit`}>
              <Button type="button">Edit</Button>
            </Link>
          </Col>
          <Col>
            <Button type="button" onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
}
