import { useEffect, useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details.");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary ? `${job.salary} per month` : "Not specified"}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <Button 
        variant="success" 
        onClick={() => window.open(job.googleFormLink, "_blank")}
        disabled={!job.googleFormLink}
      >
        Apply Now
      </Button>
    </Container>
  );
};

export default JobDetails;
