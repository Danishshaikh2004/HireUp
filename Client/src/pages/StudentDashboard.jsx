import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const StudentDashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Container className="mt-4">
      {/* Display Logged-in User's Name or Email */}
      {user ? (
        <h2>Welcome, {user.email.split("@")[0]}! 🎉</h2>
      ) : (
        <h2>Welcome to Your Dashboard! 🚀</h2>
      )}
      <p>
        Unlock amazing opportunities! Explore jobs, internships, and courses to boost your career.  
        Start your journey today! 🌟
      </p>

      <Row className="g-4">
        {/* Jobs Section */}
        <Col md={4} className="mb-4">
          <Card style={{ height: "100%" }} className="d-flex flex-column">
            <Card.Img 
              variant="top" 
              src="/src/assets/jobs.png" 
              alt="Jobs" 
              style={{ height: "250px", objectFit: "cover", padding: "10px" }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Job Listings</Card.Title>
              <Card.Text>Find full-time and part-time job opportunities.</Card.Text>
              <Button as={Link} to="/jobs" variant="primary" className="mt-auto">
                View Jobs
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Internships Section */}
        <Col md={4} className="mb-4">
          <Card style={{ height: "100%" }} className="d-flex flex-column">
            <Card.Img 
              variant="top" 
              src="/src/assets/intern.webp" 
              alt="Internships" 
              style={{ height: "250px", objectFit: "cover", padding: "10px" }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Internship Opportunities</Card.Title>
              <Card.Text>Explore internships to gain hands-on experience.</Card.Text>
              <Button as={Link} to="/internships" variant="primary" className="mt-auto">
                View Internships
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Courses Section */}
        <Col md={4} className="mb-4">
          <Card style={{ height: "100%" }} className="d-flex flex-column">
            <Card.Img 
              variant="top" 
              src="/src/assets/courses.webp" 
              alt="Courses" 
              style={{ height: "250px", objectFit: "cover", padding: "10px" }} 
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Courses & Certifications</Card.Title>
              <Card.Text>Boost your skills with online courses and certifications.</Card.Text>
              <Button as={Link} to="/courses" variant="primary" className="mt-auto">
                View Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
