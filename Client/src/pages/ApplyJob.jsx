import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams();
  const googleFormLink = "https://forms.google.com/example-form-id";

  return (
    <Container className="text-center mt-4">
      <h2>Apply for Job #{id}</h2>
      <p>Submit your application via Google Forms.</p>
      <a href={googleFormLink} target="_blank" rel="noopener noreferrer">
        <Button variant="primary">Apply Now</Button>
      </a>
    </Container>
  );
};

export default ApplyJob;
