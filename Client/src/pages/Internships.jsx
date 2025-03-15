import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:5000/api";


const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/internships`);
        setInternships(response.data); // Update state with fetched internships
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Available Internships</h2>
      {internships.length === 0 ? (
        <p>No internships available.</p>
      ) : (
        internships.map((internship) => (
          <Card key={internship._id} className="mb-3">
            <Card.Body>
              <Card.Title>{internship.title}</Card.Title>
              <Card.Text>Company: {internship.company}</Card.Text>
              <Card.Text>Duration: {internship.duration}</Card.Text>
              <Card.Text>Stipend: {internship.stipend}</Card.Text>
              <Link to={`/internship/${internship._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Internships;
