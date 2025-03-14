import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-3">
      {/* 🌟 Hero Section */}
      <h1 style={{ fontSize: "40px", color: "#1ac6ff", fontWeight: "bold" }}>
        Unlock Your Potential, Land Your Dream Job!
      </h1>
      <img src="/assets/home.webp" alt="home" className="img-fluid mb-4" />
      <h2 style={{ color: "#1ac6ff", fontWeight: "bold" }}>
        Explore. Apply. Get Hired Instantly.
      </h2>
      <p style={{ fontSize: "18px", color: "#555" }}>
        Your journey to success starts here. Find top internships and jobs effortlessly.
      </p>
      <Link to="/jobs">
        <Button style={{ backgroundColor: "#1ac6ff", borderColor: "#1ac6ff", fontSize: "18px", padding: "10px 25px" }}>
          Browse Jobs
        </Button>
      </Link>

      {/* 🏢 Trusted Companies Section */}
      <div className="mt-5" style={{ overflow: "hidden", position: "relative" }}>
        <h2 className="text-center" style={{ marginBottom: "30px", fontWeight: "bold" }}>
          Trusted by Leading Companies
        </h2>
        <div className="company-slider">
          <div className="company-logos">
            {[
              "nestle.png", "nykaa.png", "paytm.png", "phonepe.png",
              "puma.png", "jio.png", "urban.png", "airtel.png",
              "amazon.webp", "hcl.png"
            ].map((logo, index) => (
              <img key={index} src={`/assets/${logo}`} alt={logo.split(".")[0]} className="company-logo" />
            ))}
          </div>
        </div>
      </div>

      {/* 📊 Stats Section */}
      <div className="mt-5">
        <Row className="text-center">
          {[
            { value: "300K+", label: "Companies Hiring" },
            { value: "10K+", label: "New Openings Every Day" },
            { value: "21M+", label: "Active Students" },
            { value: "600K+", label: "Learners Upskilled" }
          ].map((stat, index) => (
            <Col key={index} xs={12} md={3} className="mb-4">
              <h2 style={{ color: "#1ac6ff", fontWeight: "bold" }}>{stat.value}</h2>
              <p style={{ fontSize: "16px", color: "#555" }}>{stat.label}</p>
            </Col>
          ))}
        </Row>
      </div>

      {/* 🎨 CSS for Animations */}
      <style>
        {`
          .company-slider {
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            width: 100%;
          }
          .company-logos {
            display: flex;
            gap: 30px;
            width: max-content;
            animation: scroll 12s linear infinite;
          }
          .company-logo {
            height: 60px;
            flex-shrink: 0;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Container>
  );
};

export default Home;
