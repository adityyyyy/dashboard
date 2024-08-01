import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContextProvider";
import { Button, Col, Row } from "react-bootstrap";

export default function NavBar() {
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  return (
    <>
      <Row className="fs-5 align-items-center">
        <Col>
          <Row className="gap-4 align-items-center">
            <Col className="m-4">
              <Link to="/">Home</Link>
            </Col>
            <Col className="">
              <Link to="/employees">Employee List</Link>
            </Col>
          </Row>
        </Col>
        <Col xs="auto">
          <Row className="gap-5 align-items-center">
            <Col className="col-3">{authState.name}</Col>
            <Col className="col-6">
              <Button
                type="button"
                onClick={globalLogOutDispatch}
                variant="outline-danger"
              >
                Log out
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
