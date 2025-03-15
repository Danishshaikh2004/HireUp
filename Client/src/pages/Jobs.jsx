import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`);// Adjust API endpoint if needed
        setJobs(response.data); 
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Available Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Card key={job._id} className="mb-3">
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>Company: {job.company}</Card.Text>
              <Link to={`/job/${job._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </Container>
  );
};

export default Jobs;
