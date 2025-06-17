import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom"; // For redirection

const CandidateSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    resume: null,
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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0], // Store the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { name, email, password, skills, resume } = formData;

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "candidates", user.uid), {
        name,
        email,
        skills,
        password, // (Consider not storing the password directly for security reasons)
        resume: resume ? resume.name : "No resume uploaded",
      });

      console.log("User signed up successfully:", user);
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
      <h2>Candidate Sign-Up</h2>

      {/* Success message */}
      {success && <Alert variant="success">Successfully signed up! Redirecting to login...</Alert>}

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
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

        <Form.Group className="mb-3" controlId="formSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formResume">
          <Form.Label>Resume (PDF)</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default CandidateSignUp;
