import React from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';
import './StartupShowcase.css';
import GecNavbar from './Navbar';

const startupData = [
  {
    name: "TrackMap",
    description: "A real-time logistics and delivery tracking platform built by students of GEC WC.",
    category: "Logistics",
    status: "Funded",
    badgeColor: "success"
  },
  {
    name: "AgroConnect",
    description: "Bridging farmers and buyers directly, this platform empowers agriculture-based commerce.",
    category: "AgriTech",
    status: "Incubated",
    badgeColor: "info"
  },
  {
    name: "MedLink",
    description: "A digital healthcare assistant for rural communities with minimal access to doctors.",
    category: "HealthTech",
    status: "Selected",
    badgeColor: "primary"
  },
  {
    name: "EcoBricks",
    description: "A startup working on sustainable construction using recycled materials.",
    category: "Sustainability",
    status: "Prototype",
    badgeColor: "warning"
  }
];

const StartupShowcase = () => {
  return (
    <div className="startup-showcase-section">
      <GecNavbar />
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Selected Startups from GEC WC</h1>
          <p className="lead">Under Startup Bihar Initiative</p>
        </div>

        <Row>
          {startupData.map((startup, idx) => (
            <Col md="6" lg="4" className="mb-4" key={idx}>
              <div className="startup-card p-4 shadow-sm rounded h-100">
                <h4 className="mb-2">{startup.name}</h4>
                <p className="text-muted small mb-2">{startup.category}</p>
                <p>{startup.description}</p>
                <Badge color={startup.badgeColor}>{startup.status}</Badge>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default StartupShowcase;
