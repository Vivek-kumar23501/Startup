import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import './HeroSection.css';

const HeroSection = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/institute/notices');
        setNotices(res.data);
      } catch (err) {
        console.error('❌ Error loading notices:', err.message);
      }
    };
    fetchNotices();
  }, []);

  return (
    <Container fluid className="py-4 hero-section">
      <Row className="m-0">
        {/* Left Section - Hero Text */}
        <Col lg="9" xs="12" className="mb-3 mb-lg-0 hero-left d-flex align-items-center justify-content-center">
          <div className="text-center px-4 text-hero">
            <h1 className="display-5 fw-bold">Welcome to the GEC WC Startup Cell</h1>
            <p className="lead">Fueling innovation, ideas, and student entrepreneurship under Startup Bihar.</p>
          </div>
        </Col>

        {/* Right Section - Notice Board */}
        <Col lg="3" xs="12" className="notice-board p-3 bg-white">
          <h5 className="mb-3">📢 Notice Board</h5>
          <marquee direction="up" scrollamount="3" height="300px" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
            <ul className="list-unstyled">
              {notices.length === 0 ? (
                <li>No notices available</li>
              ) : (
                notices.map((notice) => (
                  <li key={notice._id}>📌 {notice.title} – {notice.date}</li>
                ))
              )}
            </ul>
          </marquee>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
