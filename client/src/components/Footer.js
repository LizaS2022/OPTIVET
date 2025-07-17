import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { Container, Row, Col } from "react-bootstrap";

function SiteFooter() {
  return (
    <footer className="w-100 border-top bg-light mt-5">
      <Container className="py-4 py-md-5">
        <Row className="gy-4">
          <Col md={3}>
            <div className="d-flex flex-column">
              <Link
                to="/"
                className="d-flex align-items-center mb-2 text-dark text-decoration-none"
              >
                <PawPrint size={24} className="me-2" />
                <span className="fw-bold">PawCare Clinic</span>
              </Link>
              <small className="text-muted">
                Providing exceptional veterinary care since 2005
              </small>
            </div>
          </Col>

          <Col xs={6} sm={3} md={2}>
            <h6 className="fw-semibold mb-2">Services</h6>
            <ul className="list-unstyled small text-muted">
              <li>
                <Link
                  to="/services/wellness"
                  className="text-decoration-none text-muted"
                >
                  Wellness Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/services/vaccinations"
                  className="text-decoration-none text-muted"
                >
                  Vaccinations
                </Link>
              </li>
              <li>
                <Link
                  to="/services/dental"
                  className="text-decoration-none text-muted"
                >
                  Dental Care
                </Link>
              </li>
              <li>
                <Link
                  to="/services/surgery"
                  className="text-decoration-none text-muted"
                >
                  Surgery
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} sm={3} md={2}>
            <h6 className="fw-semibold mb-2">About</h6>
            <ul className="list-unstyled small text-muted">
              <li>
                <Link
                  to="/about/team"
                  className="text-decoration-none text-muted"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/about/facility"
                  className="text-decoration-none text-muted"
                >
                  Our Facility
                </Link>
              </li>
              <li>
                <Link
                  to="/about/mission"
                  className="text-decoration-none text-muted"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-decoration-none text-muted">
                  Careers
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} sm={3} md={2}>
            <h6 className="fw-semibold mb-2">Resources</h6>
            <ul className="list-unstyled small text-muted">
              <li>
                <Link to="/blog" className="text-decoration-none text-muted">
                  Pet Care Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-decoration-none text-muted">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/forms"
                  className="text-decoration-none text-muted"
                >
                  Forms
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-decoration-none text-muted"
                >
                  Emergency Info
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} sm={3} md={3}>
            <h6 className="fw-semibold mb-2">Contact</h6>
            <ul className="list-unstyled small text-muted">
              <li>123 Pet Street</li>
              <li>Anytown, ST 12345</li>
              <li>(555) 123-4567</li>
              <li>info@pawcare.com</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container className="border-top py-3">
        <Row className="align-items-center justify-content-between">
          <Col md="auto" className="text-center text-md-start mb-2 mb-md-0">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} PawCare Veterinary Clinic. All
              rights reserved.
            </small>
          </Col>
          <Col md="auto" className="text-center text-md-end">
            <Link
              to="/terms"
              className="text-muted me-3 text-decoration-none small"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-muted text-decoration-none small"
            >
              Privacy
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default SiteFooter;
