import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Services.css';
import GecNavbar from './Navbar'; // ✅ Importing Navbar
import HeroSection from './HeroSection'; // ✅ Importing HeroSection

const services = [
  {
    id: 1,
    title: 'Startup Mentorship',
    description: 'Get one-on-one guidance from industry experts to shape your ideas and strategies.',
    icon: '💡'
  },
  {
    id: 2,
    title: 'Funding Assistance',
    description: 'Connect with investors and funding agencies to kickstart your entrepreneurial journey.',
    icon: '💰'
  },
  {
    id: 3,
    title: 'Incubation Space',
    description: 'Access dedicated co-working space with high-speed internet and essential infrastructure.',
    icon: '🏢'
  },
  {
    id: 4,
    title: 'Legal & Compliance Support',
    description: 'Help with company registration, patent filing, and legal formalities.',
    icon: '📜'
  },
  {
    id: 5,
    title: 'Workshops & Seminars',
    description: 'Attend sessions on marketing, finance, technology, and business skills.',
    icon: '🛠️'
  },
  {
    id: 6,
    title: 'Networking Events',
    description: 'Meet potential co-founders, mentors, and industry leaders.',
    icon: '🤝'
  }
];

const Services = () => {
  return (
    <>
 <GecNavbar />
      <HeroSection />
    <div className="services-section py-5">
      <Container>
        <h2 className="text-center mb-5 services-heading">Our Services</h2>
        <Row   >
          {services.map(service => (
            <Col md="4" sm="6" xs="12" className="mb-5" key={service.id}>
              <div className="service-item">
                <div className="service-icon">{service.icon}</div>
                <h5 className="service-title">{service.title}</h5>
                <p className="service-desc">{service.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
       </>
  );
};

export default Services;
