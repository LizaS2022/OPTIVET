import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../hooks/use_auth"; // adjust path as needed
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  const location = useLocation();
  const { user, login, logout, loading } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      bg="light"
      expand="md"
      fixed="top"
      className="border-bottom shadow-sm z-3"
    >
      <Container className="d-flex align-items-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2 fw-bold"
        >
          <PawPrint size={20} />
          PawCare Clinic
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto me-3">
            <Nav.Link as={Link} to="/" active={isActive("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/services" active={isActive("/services")}>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={isActive("/about")}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={isActive("/contact")}>
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="outline-secondary"
                  size="sm"
                >
                  Dashboard
                </Button>
                <Button variant="outline-danger" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  size="sm"
                >
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="primary" size="sm">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
