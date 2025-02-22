import { useEffect, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const InternshipDetails = () => {
  const { id } = useParams(); // Get internship ID from URL
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/internships/${id}`);
        setInternship(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internship:", error);
        setError("Failed to load internship details.");
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2>{internship.title}</h2>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Stipend:</strong> {internship.stipend}</p>
      <p><strong>Description:</strong> {internship.description}</p>

      <Button 
        variant="success" 
        onClick={() => window.open(internship.googleFormLink, "_blank")}
        disabled={!internship.googleFormLink}
      >
        Apply Now
      </Button>
    </Container>
  );
};

export default InternshipDetails;
