import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Container, Form, Button, Card } from "react-bootstrap";

const EmployerProfile = () => {
  const [userData, setUserData] = useState({
    companyName: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "employers", user.uid));
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
      const userRef = doc(db, "employers", user.uid);
      await updateDoc(userRef, userData);
      alert("Profile updated successfully!");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">Employer Profile</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="companyName"
              value={userData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={userData.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={userData.website}
              onChange={handleChange}
              placeholder="Enter company website"
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

export default EmployerProfile;
