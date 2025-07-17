import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { PawPrint } from "lucide-react";
import { useAuth } from "../hooks/use_auth"; // Adjust path if needed
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login form submitted:", email, password);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <div className="text-center mb-4">
            <PawPrint size={28} className="mb-2" />
            <h2>Welcome back</h2>
            <p className="text-muted">
              Enter your email to sign in to your account
            </p>
          </div>

          <Card>
            <Form onSubmit={handleSubmit}>
              <Card.Body>
                <Card.Title className="mb-3">Login</Card.Title>
                <Card.Subtitle
                  className="mb-4 text-muted"
                  style={{ fontSize: "0.9rem" }}
                >
                  Access your pet's health records and appointments
                </Card.Subtitle>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label>Password</Form.Label>
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none small text-muted"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </Card.Body>
            </Form>
          </Card>

          <div className="text-center mt-3 text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-underline">
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
