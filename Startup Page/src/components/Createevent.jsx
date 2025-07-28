import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardBody
} from 'reactstrap';
import InstituteNavbar from './instutenavbar'; // ✅ Reusable Navbar

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    coordinator: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/institute/create-event',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      console.log('✅ Backend response:', res.data);

      setMessage('✅ Event created successfully!');
      setError('');
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        coordinator: ''
      });
    } catch (err) {
      console.error('❌ Error creating event:', err.response?.data || err.message);
      setError('❌ Failed to create event.');
      setMessage('');
    }
  };

  return (
    <>
      <InstituteNavbar />

      <Container className="my-5 d-flex justify-content-center">
        <Card
          style={{
            maxWidth: '600px',
            width: '100%',
            padding: '30px',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
            borderRadius: '12px'
          }}
        >
          <CardBody>
            <h2 className="text-center mb-4 text-primary">Create a New Startup Event</h2>

            {message && <Alert color="success" fade timeout={3000}>{message}</Alert>}
            {error && <Alert color="danger" fade timeout={3000}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="title">Event Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Write a short description..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="time">Time</Label>
                <Input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Event location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="coordinator">Event Coordinator</Label>
                <Input
                  type="text"
                  name="coordinator"
                  id="coordinator"
                  placeholder="Coordinator name"
                  value={formData.coordinator}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <div className="text-center mt-4">
                <Button color="primary" size="lg" type="submit">
                  Create Event
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CreateEventForm;
