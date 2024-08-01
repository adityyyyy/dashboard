// import { Link } from "react-router-dom";
// import authCtx from "../../store/AuthContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeCard from "../../components/employee-card";
import { Employee } from "../../definitions";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Users() {
  const [data, setData] = useState<Employee[]>();
  const [count, setCount] = useState(0);

  // const { authState } = useContext(authCtx);

  const onDeleteEmployee = (id: number) => {
    axios.delete("http://localhost:3030/api/admin/delete", {
      data: { id: id },
    });

    setData((prev) => {
      return prev?.filter((item) => item.f_Id !== id);
    });

    setCount(count - 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3030/api/admin/employees", {
        // headers: {
        //   "x-access-token": authState.authToken,
        // },
      })
      .then(function (response) {
        setData(response.data.employees);
        setCount(response.data.count);
      });
  }, [count, data]);

  return (
    <>
      <Row className="align-items-center mt-3 mb-3">
        <Col></Col>
        <Col xs="auto" className="fs-5">
          Total Count: {count}
        </Col>
        <Col xs="auto">
          <Link to="/employee/create">
            <Button size="lg" type="button" variant="outline-success">
              Create Employee
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col></Col>
        <Col xs="auto">Search</Col>
        <Col xs="auto">Search</Col>
      </Row>
      {count > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((employee) => (
                <EmployeeCard
                  key={employee.f_Id}
                  employee={employee}
                  onDelete={onDeleteEmployee}
                />
              ))}
          </tbody>
        </Table>
      ) : (
        <h1>End</h1>
      )}
    </>
  );
}
