import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Container, Form, Button, Card } from "react-bootstrap";

const CandidateProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    resumeLink: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "candidates", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "candidates", user.uid);
      await updateDoc(userRef, userData);
      alert("Profile updated successfully!");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">Candidate Profile</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={userData.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume Link</Form.Label>
            <Form.Control
              type="text"
              name="resumeLink"
              value={userData.resumeLink}
              onChange={handleChange}
              placeholder="Enter resume link"
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CandidateProfile;
