import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const EmployerDashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Container className="mt-4">
      {/* Display Logged-in Employer's Name or Email */}
      {user ? (
        <h2>Welcome, {user.email.split("@")[0]}! 🚀</h2>
      ) : (
        <h2>Welcome to Your Employer Dashboard! 🎯</h2>
      )}
      <p>
        Streamline your hiring process! Post jobs, manage applications, and connect with top talent.  
        Let’s build a strong team together! 🤝
      </p>

      <Row className="g-4">
        {/* Post & Manage Jobs Section (Combined) */}
        <Col md={6} className="mb-4">
          <Card style={{ height: "100%" }} className="d-flex flex-column">
            <Card.Img 
              variant="top" 
              src="/src/assets/managejobs.png" 
              alt="Job Board" 
              style={{ height: "350px", objectFit: "cover", padding: "10px" }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Job Board</Card.Title>
              <Card.Text>Post jobs and manage your listings all in one place.</Card.Text>
              <Button as={Link} to="/job-board" variant="primary" className="btn btn-info fw-semibold">
                Go to Job Board
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* View Applications Section */}
        <Col md={6} className="mb-4">
          <Card style={{ height: "100%" }} className="d-flex flex-column">
            <Card.Img 
              variant="top" 
              src="/src/assets/application.png" 
              alt="View Applications" 
              style={{ height: "350px", objectFit: "cover", padding: "10px" }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>View Applications</Card.Title>
              <Card.Text>Review and shortlist applicants efficiently.</Card.Text>
              <Button as={Link} to="/applications" variant="primary" className="btn btn-info fw-semibold">
                View Applications
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerDashboard;
