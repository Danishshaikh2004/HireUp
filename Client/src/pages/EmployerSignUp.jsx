import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; // Firebase config
import { useNavigate } from "react-router-dom"; // For redirection

const EmployerSignUp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    companyWebsite: "",
    companySize: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { companyName, email, password, companyWebsite, companySize } = formData;

    try {
      // Create employer with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save employer details to Firestore
      await setDoc(doc(db, "employers", user.uid), {
        companyName,
        email,
        companyWebsite,
        companySize,
      });

      console.log("Employer signed up successfully:", user);
      setSuccess(true);

      // Redirect to the login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message);
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Employer Sign-Up</h2>

      {/* Success message */}
      {success && <Alert variant="success">Successfully signed up! Redirecting to login...</Alert>}

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCompanyWebsite">
          <Form.Label>Company Website</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter your company's website"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCompanySize">
          <Form.Label>Company Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company size"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default EmployerSignUp;
