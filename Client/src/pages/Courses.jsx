import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <Card key={course._id} className="mb-3">
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>Provider: {course.provider}</Card.Text>
              <Card.Text>Duration: {course.duration}</Card.Text>
              <Card.Text>Price: {course.price}</Card.Text>
              <Link to={`/course/${course._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Courses;
