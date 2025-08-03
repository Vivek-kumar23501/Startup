import React from 'react';
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Alert
} from 'reactstrap';
import './AboutUs.css';
import HeroSection from './HeroSection';
import GecNavbar from './Navbar';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1: Import useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // ✅ Step 2: Initialize navigate

  return (
    <div className="about-us-section">
      <GecNavbar />
      <HeroSection />

      <div className="roadmap-full-width py-5">
        <div className="text-center">
          <h3 className="mb-4">Interactive Roadmap: How to Join</h3>
        </div>
        <Row className="justify-content-center px-4">
          {["Register", "Orientation", "Submit Idea", "Get Mentorship", "Demo Day"].map((step, idx) => (
            <Col md="2" sm="4" xs="6" key={idx} className="mb-4">
              <div className="interactive-step text-center shadow rounded p-3 h-100">
                <div className="step-icon mb-2">{idx + 1}</div>
                <h5>{step}</h5>
                <p className="small text-muted">
                  {
                    idx === 0 ? "Sign up on our student portal to begin." :
                    idx === 1 ? "Attend our orientation sessions and events." :
                    idx === 2 ? "Pitch your innovative idea for review." :
                    idx === 3 ? "Work with mentors to refine your idea." :
                    "Showcase your startup to experts and investors."
                  }
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Container className="py-5">
        <Row className="mb-5">
          <Col md="12" className="text-center">
            <h1 className="display-4 fw-bold">About Our Startup Cell</h1>
            <p className="lead">Fostering innovation, entrepreneurship, and impact within GEC West Champaran.</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="6">
            <div className="custom-box shadow-sm p-4 h-100">
              <h4>Our Mission</h4>
              <p>
                To inspire and support the entrepreneurial spirit of students by providing mentorship, infrastructure, and opportunities to turn ideas into reality.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="custom-box shadow-sm p-4 h-100">
              <h4>What We Offer</h4>
              <ul>
                <li>🧠 Expert Mentorship</li>
                <li>🏢 Incubation Support</li>
                <li>💰 Funding Guidance</li>
                <li>🌐 Networking Opportunities</li>
                <li>📈 Business Development Training</li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="6">
            <div className="custom-box shadow-sm p-4 h-100">
              <h4>Startup India Initiative <Badge color="warning">National</Badge></h4>
              <p>
                A Government of India initiative empowering startups through tax benefits, easier compliance, fast-tracked IPR, and access to a Startup Fund.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="custom-box shadow-sm p-4 h-100">
              <h4>Startup Bihar Initiative <Badge color="info">State</Badge></h4>
              <p>
                Bihar government promotes local entrepreneurship by providing seed funding, training, and incubation support to student-led startups.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5" style={{ background: '#fff', color: '#000' }}>
          <Col md="6">
            <h3>Build Your Dream with Us</h3>
            <p>
              Join our Startup Cell and take the first step towards turning your ideas into a reality. We offer end-to-end support for students passionate about innovation and entrepreneurship.
            </p>
          </Col>
          <Col md="6">
            <Alert color="light" className="text-dark shadow">
              <h4>Did You Know?</h4>
              <p>
                India has become the 3rd largest startup ecosystem in the world. With Startup India and Startup Bihar, young minds now have unparalleled opportunities.
              </p>
            </Alert>
          </Col>
        </Row>

      <Row className="text-center mt-5">
  <Col md="12">
    <h3 className="mb-3">Selected Startups under Startup Bihar</h3>
    <p className="mb-4">
      Explore innovative ideas from our campus that have been recognized under the Startup Bihar initiative.
    </p>
    <Button color="dark" size="lg" onClick={() => navigate('/startup-bihar-showcase')}>
      View Selected Startups
    </Button>
  </Col>
</Row>

      </Container>
    </div>
  );
};

export default AboutUs;
