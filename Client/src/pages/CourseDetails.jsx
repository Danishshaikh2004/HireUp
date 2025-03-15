import { useEffect, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:5000/api";

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("📡 Fetching course details from:", `${API_BASE_URL}/courses/${id}`);
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching course:", error);
        setError("Failed to load course details.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2>{course.title}</h2>
      <p><strong>Provider:</strong> {course.provider}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Price:</strong> {course.price}</p>
      <p><strong>Description:</strong> {course.description}</p>

      <Button 
        variant="success" 
        onClick={() => window.open(course.googleFormLink, "_blank")}
        disabled={!course.googleFormLink}
      >
        Enroll Now
      </Button>
    </Container>
  );
};

export default CourseDetails;
