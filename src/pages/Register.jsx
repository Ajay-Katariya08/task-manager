import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <div className="text-center mb-4">
              <FaSignInAlt size={40} className="text-primary" />
              <h3 className="mt-2 fw-bold">Create Account</h3>
              <p className="text-muted small">Register to manage your tasks</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaEnvelope className="me-2" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  <FaLock className="me-2" />
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mb-3">
                Register
              </Button>
            </Form>

            <div className="text-center">
              <Link to="/login" className="text-decoration-none text-primary">
                <FaSignInAlt className="me-2" />
                Already registered? Login here
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
