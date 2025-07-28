import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import InstituteNavbar from './instutenavbar';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Alert,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const fetchEvents = async () => {
    try {
      const res = await axios.get('https://startup-w0fm.onrender.com');
      setActiveEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Error fetching events:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://startup-w0fm.onrender.com/${eventId}`);
      setAlert({ type: 'success', message: '✅ Event deleted successfully' });
      setActiveEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error('❌ Delete error:', err.message);
      setAlert({ type: 'danger', message: '❌ Failed to delete event' });
    }

    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <InstituteNavbar />
      <Container className="my-5">
        <HeroSection />
        <h2 className="text-center mb-4">Institute Dashboard</h2>

        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

        {/* Startup India Highlights */}
        <section className="mb-5">
          <h4 className="mb-3">🚀 Startup India Highlights</h4>
          <Row>
            <Col md="6">
              <Card className="shadow-sm">
                <CardBody>
                  <CardTitle tag="h5">Startup India Mission</CardTitle>
                  <CardText>
                    A flagship initiative to empower startups through benefits, funding, and support systems.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="shadow-sm">
                <CardBody>
                  <CardTitle tag="h5">Startup Bihar Drive</CardTitle>
                  <CardText>
                    Promoting entrepreneurship in Bihar through incubation, mentorship, and financial assistance.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Institution Overview */}
        <section className="mb-5">
          <h4 className="mb-3">🏫 Institution Overview</h4>
          <ListGroup>
            <ListGroupItem><strong>Name:</strong> Government Engineering College, West Champaran</ListGroupItem>
            <ListGroupItem><strong>Cell Coordinator:</strong> Prof. A. Mishra</ListGroupItem>
            <ListGroupItem><strong>Contact:</strong> startupcell@gecwc.ac.in</ListGroupItem>
            <ListGroupItem><strong>Established:</strong> 2022</ListGroupItem>
          </ListGroup>
        </section>

        {/* Top Startup Ideas */}
        <section className="mb-5">
          <h4 className="mb-3">🌟 Top Startup Ideas from Students</h4>
          <Row>
            <Col md="6">
              <Card className="p-3 shadow-sm">
                <CardText><strong>Smart Waste Bin</strong> - IoT enabled bins that notify when full and promote smart city management.</CardText>
              </Card>
            </Col>
            <Col md="6">
              <Card className="p-3 shadow-sm">
                <CardText><strong>AgriDrone</strong> - A drone-based solution for pesticide spraying and crop monitoring in rural Bihar.</CardText>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Active Events */}
        <section className="mb-5">
          <h4 className="mb-3">📅 Active Events</h4>
          {loading ? (
            <Spinner color="primary" />
          ) : activeEvents.length === 0 ? (
            <Alert color="info">No active events found.</Alert>
          ) : (
            <Row>
              {activeEvents.map((event) => (
                <Col md="6" key={event._id} className="mb-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <CardTitle tag="h5">{event.title}</CardTitle>
                      <CardText><strong>Description:</strong> {event.description}</CardText>
                      <CardText><strong>Date:</strong> {event.date}</CardText>
                      <CardText><strong>Time:</strong> {event.time}</CardText>
                      <CardText><strong>Location:</strong> {event.location}</CardText>
                      <CardText><strong>Coordinator:</strong> {event.coordinator}</CardText>
                      <Button color="danger" size="sm" onClick={() => handleDelete(event._id)}>
                        🗑 Delete
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* 🔘 Interactive Action Boxes (No Card component) */}
        <section className="mb-5">
          <Row className="justify-content-center g-4">
            <Col md="4">
              <div className="text-center shadow-lg p-4 bg-light rounded h-100">
                <h5 className="mb-3">➕ Create New Event</h5>
                <p>
                  Plan impactful startup events to showcase innovation and connect with mentors.
                </p>
                <Button color="success" onClick={() => navigate('/institute/create-event')}>
                  Create Event
                </Button>
              </div>
            </Col>

            <Col md="4">
              <div className="text-center shadow-lg p-4 bg-white rounded h-100">
                <h5 className="mb-3">📥 View Startup Ideas</h5>
                <p>
                  Explore innovative startup ideas submitted by students and provide mentorship.
                </p>
                <Button color="info" onClick={() => navigate('/view-startup-ideas')}>
                  View Ideas
                </Button>
              </div>
            </Col>

           <Col md="4">
  <div className="text-center shadow-lg p-4 bg-light rounded h-100">
    <h5 className="mb-3">🗑️ Delete Notice</h5>
    <p>
      Manage or delete previous notices issued by the institute.
    </p>
    <Button color="danger" onClick={() => navigate('/institute/delete-notice')}>
      Delete Notice
    </Button>
  </div>
</Col>

          </Row>
        </section>
      </Container>
    </>
  );
};

export default InstituteDashboard;
