import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.jpg";
import NavigationBar from "./NavigationBar";
import SiteFooter from "./Footer";
function Main() {
  return (
    <div>
      <NavigationBar />
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <section
            className="py-5"
            style={{
              background: "linear-gradient(to bottom, white, #f8fafc)",
              paddingTop: "6rem",
              paddingBottom: "8rem",
            }}
          >
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-6">
                  <h1 className="display-4 fw-bold">
                    Welcome to OptiVet Veterinary Clinic
                  </h1>
                  <p className="lead text-muted" style={{ maxWidth: "600px" }}>
                    Providing exceptional care for your furry family members.
                    Schedule appointments, view medical history, and more.
                  </p>
                  <div className="d-flex flex-column flex-md-row gap-3 mt-3">
                    <Link
                      to="/dashboard"
                      className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                    >
                      <PawPrint size={20} />
                      Schedule an Appointment
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline-secondary btn-lg"
                    >
                      Login to Your Account
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src={logo}
                    alt="PawCare Logo"
                    className="img-fluid rounded-4"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            className="py-5 bg-white"
            style={{
              paddingTop: "6rem",
              paddingBottom: "8rem",
            }}
          >
            <div className="container text-center">
              <h2 className="display-5 fw-bold">Our Services</h2>
              <p
                className="text-muted mx-auto mb-5"
                style={{
                  maxWidth: "900px",
                  fontSize: "1.25rem",
                  lineHeight: "1.8",
                }}
              >
                Comprehensive veterinary care for all your pet's needs
              </p>
              <div className="row g-5">
                {[
                  {
                    title: "Wellness Exams",
                    desc: "Regular check-ups to keep your pet healthy and catch issues early.",
                  },
                  {
                    title: "Vaccinations",
                    desc: "Protect your pet from common diseases with our vaccination programs.",
                  },
                  {
                    title: "Dental Care",
                    desc: "Comprehensive dental services to maintain your pet's oral health.",
                  },
                ].map((service, idx) => (
                  <div className="col-lg-4" key={idx}>
                    <div className="d-flex flex-column align-items-center text-center h-100 px-3">
                      <div
                        className="bg-light text-dark rounded d-flex align-items-center justify-content-center mb-3"
                        style={{ width: "48px", height: "48px" }}
                      >
                        <PawPrint size={24} />
                      </div>
                      <h4 className="fw-bold">{service.title}</h4>
                      <p className="text-muted">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

export default Main;
