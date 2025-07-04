import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          {/* Branding */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">HireUp.</h5>
            <p>Empowering students with career-defining opportunities through jobs, internships, and skill-building courses!</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-white text-decoration-none">Jobs</Link>
              </li>
              <li>
                <Link to="/internships" className="text-white text-decoration-none">Internships</Link>
              </li>
              <li>
                <Link to="/courses" className="text-white text-decoration-none">Courses</Link>
              </li>
            </ul>
          </Col>

          {/* Social Media Links */}
          <Col md={4}>
            <h5>Follow Us On</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black fs-4">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black fs-4">
                <FaTwitter />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-black fs-4">
                <FaGithub />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <hr className="border-light mt-4" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} HireUp. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
