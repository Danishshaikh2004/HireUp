import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(""); // Track user type
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "candidate"; // Default to candidate
    setUserType(storedUserType);
  }, []);

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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Verify user role from Firestore
      let role = userType; // Use stored role from Navbar selection
      const userDoc = await getDoc(doc(db, "candidates", user.uid));
      
      if (!userDoc.exists()) {
        const employerDoc = await getDoc(doc(db, "employers", user.uid));
        if (employerDoc.exists()) {
          role = "employer";
        }
      }

      localStorage.setItem("userType", role); // Ensure role is stored properly

      if (role === "candidate") {
        navigate("/student/dashboard");
      } else {
        navigate("/employer/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login Error:", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <p className="mt-3">
        Don't have an account? <br />
        <Link to="/candidate-signup">Sign up as a Candidate</Link> or{" "}
        <Link to="/employer-signup">Sign up as an Employer</Link>
      </p>
    </Container>
  );
};

export default Login;
