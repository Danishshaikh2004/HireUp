// src/pages/Register.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="mt-4">
      <h2>Register</h2>
      <p>Choose how you want to register:</p>
      <Link to="/candidate-signup">
        <Button variant="primary" className="mb-3">
          Register as a Candidate
        </Button>
      </Link>
      <br />
      <Link to="/employer-signup">
        <Button variant="secondary">
          Register as an Employer
        </Button>
      </Link>
    </Container>
  );
};

export default Register;
