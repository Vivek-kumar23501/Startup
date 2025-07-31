import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import UserNavbar from './UserNavbar';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardText,
  CardTitle
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css'; // Add this CSS file for custom styles

const mentors = [
  { name: "Om Prakash Ram", field: "AI & Innovation", email: "omprakashram505@gmail.com" },
  { name: "Kumar Yash Raj", field: "Business Strategy", email: "yash@startuphub.com" },
  { name: "Pratik Kumar", field: "Campus Representative", email: "aditya@mentorconnect.com" }
];

const announcements = [
  "🚀 Applications for Idea Pitching Day are now open!",
  "💡 New startup funding guide has been uploaded.",
  "🎤 Guest lecture by Flipkart Startup Mentor on 3rd Aug."
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/institute/events');
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching events:", err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <UserNavbar />
      <Container className="my-5">
        <HeroSection />
      <hr></hr>
      <br />
      <br />
      <br />

        {/* Events Section */}
        <section className="mb-5">
          <h4 className="mb-3">Upcoming Startup Events</h4>
          {loading ? (
            <p>🔄 Loading events...</p>
          ) : events.length === 0 ? (
            <p>⚠️ No events found.</p>
          ) : (
            <Row>
              {events.slice(0, 6).map(event => (
                <Col md="4" key={event._id} className="mb-4">
                  <div className="event-block p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold text-primary">{event.title}</h5>
                      <p className="mb-2">{event.description}</p>
                      <p className="mb-1"><strong>Date:</strong> {event.date}</p>
                      <p className="mb-1"><strong>Time:</strong> {event.time}</p>
                      <p className="mb-3"><strong>Location:</strong> {event.location}</p>
                    </div>
                    <Button
                      color="primary"
                      block
                      onClick={() => navigate(`/apply/${event._id}`)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Mentorship Section */}
       {/* Mentorship Section */}
<section className="mb-5">
  <h4 className="mb-3">Available Mentors & Resources</h4>
  <Row>
    {mentors.map((mentor, idx) => (
      <Col md="4" key={idx} className="mb-4">
        <div className="event-block p-4 h-100">
          <h5 className="fw-bold text-success">{mentor.name}</h5>
          <p><strong>Expertise:</strong> {mentor.field}</p>
          <p><strong>Contact:</strong> {mentor.email}</p>
        </div>
      </Col>
    ))}
  </Row>
</section>


        {/* Announcements */}
        <section className="mb-5">
          <h4 className="mb-3">📢 Announcements</h4>
          <ListGroup>
            {announcements.map((note, idx) => (
              <ListGroupItem key={idx} color="info">
                {note}
              </ListGroupItem>
            ))}
          </ListGroup>
        </section>

        {/* Startup Stories */}
        <section className="mb-5">
          <h4 className="mb-3">🌟 Startup Success Stories</h4>
          <Row>
            <Col md="6">
              <Card className="p-3 shadow-sm">
                <CardText><strong>GreenTech Solutions</strong> - Started by GECWC alumni, they revolutionized local farming with AI-driven irrigation systems.</CardText>
              </Card>
            </Col>
            <Col md="6">
              <Card className="p-3 shadow-sm">
                <CardText><strong>EduNex</strong> - An ed-tech platform built during college, now serves 10,000+ students across Bihar.</CardText>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA */}
        <section className="text-center mt-5">
          <h4 className="mb-3">✨ Turn Your Ideas Into Reality!</h4>
          <p className="mb-4">Every great startup begins with a spark of inspiration. Don’t wait—build your legacy today with guidance, community, and opportunity.</p>
          <Button color="dark" size="lg" onClick={() => navigate('/submit-idea')}>
            Apply Your Idea
          </Button>
        </section>
      </Container>
    </>
  );
};

export default UserDashboard;
