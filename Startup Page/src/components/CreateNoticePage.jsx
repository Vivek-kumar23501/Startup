import React, { useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';
import InstituteNavbar from '../components/instutenavbar';

const CreateNoticePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    place: ''
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://startup-w0fm.onrender.com', formData);
      setAlert({ type: 'success', message: '✅ Notice created successfully!' });

      setFormData({
        title: '',
        description: '',
        date: '',
        place: ''
      });
    } catch (err) {
      console.error('❌ Error creating notice:', err.message);
      setAlert({ type: 'danger', message: '❌ Failed to create notice' });
    }

    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  return (
    <>
      <InstituteNavbar />
      <Container className="my-5">
        <div className="p-4 bg-light shadow rounded">
          <h2 className="mb-4 text-center text-primary">📢 Create Notice</h2>
          {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">🔖 Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter notice title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">📝 Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                rows="5"
                placeholder="Enter detailed description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="date">📅 Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="place">📍 Place</Label>
                  <Input
                    type="text"
                    name="place"
                    id="place"
                    placeholder="Enter location"
                    value={formData.place}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="text-center">
              <Button type="submit" color="primary" size="md">
                Submit Notice
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default CreateNoticePage;
