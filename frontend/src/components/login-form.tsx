import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

type LoginFormProps = {
  onSubmit: (admin: { username: string; password: string }) => void;
};
export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    onSubmit({
      username: username,
      password: password,
    });
  };

  return (
    <Stack className="mx-auto">
      <Form
        onSubmit={submitHandler}
        className="mt-4 d-flex flex-column align-items-center"
      >
        <Form.Group controlId="username" className="mb-4">
          <Row className="align-items-center gap-5">
            <Col className="col-2">
              <Form.Label>Username</Form.Label>
            </Col>
            <Col>
              <Form.Control
                autoComplete="true"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <Row className="align-items-center gap-5">
            <Col className="col-2">
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button type="submit" size="sm">
          LOGIN
        </Button>
      </Form>
    </Stack>
  );
}
