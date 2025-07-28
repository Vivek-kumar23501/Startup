// src/pages/ApplyFormPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Form, FormGroup, Label, Input, Button, Alert
} from 'reactstrap';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const ApplyFormPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    registration: '',
    email: '',
    mobile: ''
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/applications/manual-apply', {
        ...formData,
        eventId
      });
      setAlert({ type: 'success', message: '✅ Application submitted successfully!' });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("❌ Submit error:", error);
      setAlert({ type: 'danger', message: '❌ Submission failed. Try again.' });
    }
  };

  return (
    <>
    <UserNavbar />
    
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Apply for Event</h2>
      {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="registration">Registration Number</Label>
          <Input type="text" name="registration" value={formData.registration} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="mobile">Mobile Number</Label>
          <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" color="primary" block>Submit Application</Button>
      </Form>
    </Container>
    </>
  );
};


export default ApplyFormPage;
