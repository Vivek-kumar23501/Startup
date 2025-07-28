import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Button
} from 'reactstrap';
import './AboutUs.css';
import HeroSection from './HeroSection';
import GecNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook added

  return (
    <>
      <GecNavbar />
      <HeroSection />
      <div className="about-us-section">
        <Container className="py-5">
          <Row className="mb-5">
            <Col md="12" className="text-center">
              <h1 className="display-4 fw-bold">About Our Startup Cell</h1>
              <p className="lead">Fostering innovation, entrepreneurship, and impact within GEC West Champaran.</p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md="6">
              <Card className="shadow-sm h-100 gradient-card">
                <CardBody>
                  <CardTitle tag="h4">Our Mission</CardTitle>
                  <CardText>
                    To inspire and support the entrepreneurial spirit of students by providing mentorship, infrastructure, and opportunities to turn ideas into reality.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="shadow-sm h-100 gradient-card">
                <CardBody>
                  <CardTitle tag="h4">What We Offer</CardTitle>
                  <CardText>
                    <ul>
                      <li>🧠 Expert Mentorship</li>
                      <li>🏢 Incubation Support</li>
                      <li>💰 Funding Guidance</li>
                      <li>🌐 Networking Opportunities</li>
                      <li>📈 Business Development Training</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md="6">
              <Card className="bg-light h-100 border-0 shadow-sm">
                <CardBody>
                  <CardTitle tag="h4">
                    Startup India Initiative <Badge color="warning">National</Badge>
                  </CardTitle>
                  <CardText>
                    A Government of India initiative empowering startups through tax benefits, easier compliance, fast-tracked IPR, and access to a Startup Fund.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="bg-light h-100 border-0 shadow-sm">
                <CardBody>
                  <CardTitle tag="h4">
                    Startup Bihar Initiative <Badge color="info">State</Badge>
                  </CardTitle>
                  <CardText>
                    Bihar government promotes local entrepreneurship by providing seed funding, training, and incubation support to student-led startups.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="text-center mt-5">
            <Col md="12">
              <h3 className="mb-4">Ready to Launch Your Startup?</h3>
              <p className="mb-4">
                Join our Startup Cell today and begin your entrepreneurial journey with guidance, support, and community.
              </p>
              <Button color="dark" size="lg" onClick={() => navigate('/submit-idea')}>
                Apply Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AboutUs;
