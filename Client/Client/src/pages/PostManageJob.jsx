import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    category: "",
    description: "",
    deadline: "",
    googleFormLink: "", // Added googleFormLink
  });

  const [editJobId, setEditJobId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (let field in jobData) {
      if (!jobData[field]) {
        setMessage({ type: "danger", text: "All fields are required!" });
        setTimeout(() => setMessage(null), 3000);
        return;
      }
    }

    try {
      const response = await fetch(
        editJobId ? `http://localhost:5000/api/jobs/${editJobId}` : "http://localhost:5000/api/jobs",
        {
          method: editJobId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        }
      );

      if (response.ok) {
        setMessage({ type: "success", text: editJobId ? "Job updated successfully!" : "Job posted successfully!" });
        fetchJobs();
        setJobData({
          title: "",
          company: "",
          location: "",
          type: "",
          category: "",
          description: "",
          deadline: "",
          googleFormLink: "", // Reset googleFormLink after submission
        });
        setEditJobId(null);
      } else {
        setMessage({ type: "danger", text: "Failed to process request!" });
      }
    } catch (error) {
      console.error("Error posting/updating job:", error);
    }
  };

  const handleEdit = (job) => {
    setJobData(job);
    setEditJobId(job._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
      setMessage({ type: "danger", text: "Job deleted successfully!" });
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Job Board</h1>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" value={jobData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" value={jobData.company} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={jobData.location} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Type</Form.Label>
          <Form.Control type="text" name="type" value={jobData.type} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={jobData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={jobData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" name="deadline" value={jobData.deadline} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Google Form Link</Form.Label>
          <Form.Control type="text" name="googleFormLink" value={jobData.googleFormLink} onChange={handleChange} required />
        </Form.Group>
        <Button style={{ marginTop: "10px" }} type="submit">{editJobId ? "Update Job" : "Post Job"}</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.category}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(job)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(job._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default JobBoard;