import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications from backend API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all-applications");
        // console.log("Fetched Applications:", response.data);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };
    fetchApplications();
  }, []);

  const updateStatus = (index, newStatus) => {
    setApplications(prevApplications =>
      prevApplications.map((app, i) =>
        i === index ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <Container className="mt-4">
      <h2>View Applications</h2>
      <p>Manage and review job applications submitted by candidates.</p>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Applicant</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{app.type || "N/A"}</td>
              <td>{app.jobTitle || app["Intern Title"] || app["Job Title"] || "N/A"}</td>
              <td>{app.applicant || app["Full Name"] || "Unknown"}</td>
              <td>{app.email || app["Email address"] || "N/A"}</td>
              <td>
                {app["Resume"] ? (
                  <a href={app["Resume"]} target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                ) : (
                  "Not Provided"
                )}
              </td>
              <td>{app.status || "Pending"}</td>
              <td>
                <Button variant="success" onClick={() => updateStatus(index, "Accepted")} >
                  Accept
                </Button>

                <Button variant="danger" onClick={() => updateStatus(index, "Rejected")}>
                  Reject
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewApplications;