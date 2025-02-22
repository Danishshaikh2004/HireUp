import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      {/* Main Heading Section */}
      <h1 style={{ fontSize: "50px", color: "#1ac6ff" }}>Make your dream career a reality</h1>
      <img src="/src/assets/home.webp" alt="home" className="img-fluid mb-4" />
      <h1 style={{ color: "#1ac6ff" }}>Find Internships & Jobs Easily</h1>
      <p>Your career starts here!</p>
      <Link to="/jobs">
        <Button style={{ backgroundColor: "#1ac6ff", borderColor: "#1ac6ff", color: "#fff" }}>
          Browse Jobs
        </Button>
      </Link>



      <div className="mt-5" style={{ overflow: "hidden", position: "relative" }}>
        <h2 className="text-center" style={{ marginBottom: "40px" }}>
          Top companies trust us
        </h2>
        <div
          className="d-flex align-items-center"
          style={{
            display: "flex",
            gap: "30px",
            whiteSpace: "nowrap",
            animation: "scroll 15s linear infinite",
            width: "max-content", 
            marginTop: "20px", 
            marginBottom: "30px",
          }}
        >
          <img src="/src/assets/nestle.png" alt="nestle" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/nykaa.jpg" alt="nykaa" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/paytm.png" alt="paytm" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/phonepe.png" alt="phonepe" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/puma.png" alt="puma" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/jio.png" alt="jio" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/urban.png" alt="urban" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/airtel.png" alt="airtel" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/amazon.webp" alt="amazon" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
          <img src="/src/assets/hcl.jpeg" alt="hcl" className="img-fluid" style={{ height: "60px", flexShrink: "0" }} />
        </div>
        <style>
          {`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `}
        </style>
      </div>





      {/* Stats Section */}
      <div className="mt-5">
        <Row className="text-center">
          <Col xs={12} md={3} className="mb-4">
            <h2 style={{ color: "#1ac6ff" }}>300K+</h2>
            <p>Companies Hiring</p>
          </Col>
          <Col xs={12} md={3} className="mb-4">
            <h2 style={{ color: "#1ac6ff" }}>10K+</h2>
            <p>New openings everyday</p>
          </Col>
          <Col xs={12} md={3} className="mb-4">
            <h2 style={{ color: "#1ac6ff" }}>21M+</h2>
            <p>Active students</p>
          </Col>
          <Col xs={12} md={3} className="mb-4">
            <h2 style={{ color: "#1ac6ff" }}>600K+</h2>
            <p>Learners</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
