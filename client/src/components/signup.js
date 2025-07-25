import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { PawPrint } from "lucide-react";
import { useAuth } from "../hooks/use_auth"; 
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
export default function SignupPage() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await signup(
        first_name,
        last_name,
        email,
        password,
        address,
        role,
        phone
      );
      console.log("Signup response:", data);

      if (data?.first_name && data?.last_name) {
        navigate(
          `/dashboard/${data.first_name.toUpperCase()}${data.last_name.toUpperCase()}`
        );
      } else {
        setError("Signup succeeded, but user data is incomplete");
      }
    } catch (err) {
      setError(err.message || "Failed to create account");
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
            <h2>Create an account</h2>
            <p className="text-muted">
              Enter your information to create an account
            </p>
          </div>

          <Card>
            <Form onSubmit={handleSubmit}>
              <Card.Body>
                <Card.Title className="mb-3">Sign Up</Card.Title>
                <Card.Subtitle
                  className="mb-4 text-muted"
                  style={{ fontSize: "0.9rem" }}
                >
                  Get started with OptiVet Veterinary Clinic
                </Card.Subtitle>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="joedoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123 Main St"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="owner">Owner</option>
                    <option value="staff">Staff</option>
                    <option value="veterinarian">Veterinarian</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </Card.Body>
            </Form>
          </Card>

          <div className="text-center mt-3 text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-underline">
              Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
