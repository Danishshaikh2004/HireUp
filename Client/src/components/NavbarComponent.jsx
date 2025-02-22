import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function NavbarComponent() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const storedUserType = localStorage.getItem("userType") || "candidate";
        setUserType(storedUserType);
      } else {
        setUser(null);
        setUserType("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userType");
    navigate("/");
  };

  const handleLoginSelect = (type) => {
    localStorage.setItem("userType", type);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-white py-3">
      <Container>
        {/* Logo Section */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <h4 style={{ color: "#1ac6ff", fontWeight: "bold", margin: 0 }}>Internshala</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto d-flex align-items-center gap-2">
            <Nav.Link as={Link} to="/jobs" className="fw-semibold text-grey ms-lg-4 fs-5 fs-lg-4">
              Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/internships" className="fw-semibold text-grey ms-lg-4 fs-5 fs-lg-4">
              Internships
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="fw-semibold text-grey ms-lg-4 fs-5 fs-lg-4">
              Courses
            </Nav.Link>
          </Nav>

          {/* Right-Side Buttons */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {user ? (
              <>
                {/* User Profile */}
                <Link
                  to={userType === "employer" ? "/profile/employer" : "/profile/user"}
                  className="text-dark d-flex align-items-center"
                  style={{ fontSize: "20px", textDecoration: "none" }}
                >
                  <FaUserCircle className="me-2" />
                </Link>

                {/* Logout Button */}
                <div
                  className="text-danger d-flex align-items-center"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" />
                </div>
              </>
            ) : (
              <>
                {/* Login Dropdown */}
                <div
                  className="position-relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setTimeout(() => setShowDropdown(false), 300)}
                >
                  <button className="btn btn-outline-primary">Login</button>

                  {showDropdown && (
                    <div
                      className="position-absolute bg-white shadow-sm rounded p-2"
                      style={{
                        top: "40px",
                        left: "0",
                        minWidth: "200px",
                        zIndex: "1000",
                      }}
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <button
                        className="btn w-100 text-start"
                        onClick={() => handleLoginSelect("candidate")}
                      >
                        Login as Candidate
                      </button>
                      <button
                        className="btn w-100 text-start mt-1"
                        onClick={() => handleLoginSelect("employer")}
                      >
                        Login as Employer
                      </button>
                    </div>
                  )}
                </div>

                {/* Register Buttons */}
                <Link to="/candidate-signup" className="btn btn-info text-white fw-semibold">
                  Register as Candidate
                </Link>
                <Link to="/employer-signup" className="btn btn-info text-white fw-semibold">
                  Register as Employer
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

