import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { Col, Row, Stack } from "react-bootstrap";

function App() {
  return (
    <>
      <Stack gap={2}>
        <Row className="fs-5" color="">
          <Col xs="auto">
            <img src="logo.svg" alt="" />
          </Col>
          <Col>
            <span>Admin</span>
          </Col>
        </Row>
        <ToastContainer position="bottom-center" limit={1} />
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
