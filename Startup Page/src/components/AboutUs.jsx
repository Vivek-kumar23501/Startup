import React from 'react';
import {
  Container,
  Row,
  Col,
  Badge,
  Button
} from 'reactstrap';
import './AboutUs.css';
import HeroSection from './HeroSection';
import GecNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <GecNavbar />
      <HeroSection />
      <div className="about-us-section">
        <Container className="py-5">
          {/* Header */}
          <Row className="mb-5">
            <Col md="12" className="text-center">
              <h1 className="display-4 fw-bold">About Our Startup Cell</h1>
              <p className="lead">Fostering innovation, entrepreneurship, and impact within GEC West Champaran.</p>
            </Col>
          </Row>

          {/* Mission & Offer */}
          <Row className="mb-4">
            <Col md="6">
              <div className="p-4 h-100 shadow-sm gradient-card rounded">
                <h4>Our Mission</h4>
                <p>
                  To inspire and support the entrepreneurial spirit of students by providing mentorship, infrastructure,
                  and opportunities to turn ideas into reality.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="p-4 h-100 shadow-sm gradient-card rounded">
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

          {/* Startup Initiatives */}
          <Row className="mb-4">
            <Col md="6">
              <div className="p-4 h-100 bg-light shadow-sm rounded">
                <h4>
                  Startup India Initiative <Badge color="warning">National</Badge>
                </h4>
                <p>
                  A Government of India initiative empowering startups through tax benefits, easier compliance,
                  fast-tracked IPR, and access to a Startup Fund.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="p-4 h-100 bg-light shadow-sm rounded">
                <h4>
                  Startup Bihar Initiative <Badge color="info">State</Badge>
                </h4>
                <p>
                  Bihar government promotes local entrepreneurship by providing seed funding, training, and incubation
                  support to student-led startups.
                </p>
              </div>
            </Col>
          </Row>

          {/* CTA */}
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
    </>
  );
};

export default AboutUs;
