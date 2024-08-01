import { Button, Col, Form, Row } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { EmployeeProp } from "../definitions";

type EmployeeFormProps = {
  onSubmit: (employee: EmployeeProp) => void;
} & Partial<EmployeeProp>;

export default function EmployeeForm({
  onSubmit,
  name = "",
  email = "",
  mobile = "",
  gender = "M",
  designation = "Sales",
  course = "BCA",
  image,
}: EmployeeFormProps) {
  const [nameS, setNameS] = useState(name);
  const [emailS, setEmailS] = useState(email);
  const [mobileS, setMobileS] = useState(mobile);
  const [genderS, setGenderS] = useState(gender);
  const [designationS, setDesignationS] = useState(designation);
  const [courseS, setCourseS] = useState(course);
  const [imageS, setImageS] = useState(image);

  const onImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImageS(target.files[0]);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      name: nameS,
      email: emailS,
      mobile: mobileS,
      gender: genderS,
      designation: designationS,
      course: courseS,
      image: imageS,
    });
  };

  return (
    <Form
      onSubmit={submitHandler}
      encType="multipart/form-data"
      className="mt-4"
    >
      <Form.Group controlId="name" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Name</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Control
              required
              onChange={(e) => setNameS(e.target.value)}
              defaultValue={name}
              type="text"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="email" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Email</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Control
              required
              defaultValue={email}
              type="email"
              onChange={(e) => setEmailS(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="mobile" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Mobile No.</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Control
              required
              defaultValue={mobile}
              type="text"
              onChange={(e) => setMobileS(e.target.value)}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="gender" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Gender</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Check
              inline
              required
              type="radio"
              name="gender"
              label="Male"
              onClick={() => setGenderS("M")}
            />
            <Form.Check
              inline
              type="radio"
              name="gender"
              label="Female"
              onClick={() => setGenderS("F")}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="course" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Course</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Check
              type="checkbox"
              inline
              label="MCA"
              // checked={courseS === "MCA"}
              onClick={() => setCourseS("MCA")}
            />
            <Form.Check
              inline
              type="checkbox"
              label="BCA"
              // checked={courseS === "BCA"}
              onClick={() => setCourseS("BCA")}
            />
            <Form.Check
              inline
              type="checkbox"
              label="BSC"
              // checked={courseS === "BSC"}
              onClick={() => setCourseS("BSC")}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="designation" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Designation</Form.Label>
          </Col>
          <Col className="col-4">
            <Form.Control
              as="select"
              value={designationS}
              onChange={(e: any) => setDesignationS(e.currentTarget.value)}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="Image" className="mb-4">
        <Row>
          <Col className="col-2">
            <Form.Label>Image</Form.Label>
          </Col>
          <Col className="col-4">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={onImageChange}
            />
          </Col>
        </Row>
      </Form.Group>
      <Row>
        <Col className="col-2"></Col>
        <Col className="col-3">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
