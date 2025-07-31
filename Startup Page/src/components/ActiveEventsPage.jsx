// pages/ActiveEventsPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import UserNavbar from '../components/UserNavbar';
import './PageStyles.css';

const ActiveEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ Initialize the hook

  const fetchEvents = async () => {
    try {
     const res = await axios.get('http://localhost:5000/api/institute/events');
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching events:", err.message);
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
        <h2 className="text-center mb-4">🗓️ Active Startup Events</h2>
        {loading ? (
          <p>🔄 Loading events...</p>
        ) : events.length === 0 ? (
          <p>⚠️ No active events available.</p>
        ) : (
          <Row>
            {events.map(event => (
              <Col md="4" className="mb-4" key={event._id}>
                <div className="event-block p-4 h-100">
                  <h5 className="fw-bold text-primary">{event.title}</h5>
                  <p>{event.description}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
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
      </Container>
    </>
  );
};

export default ActiveEventsPage;
