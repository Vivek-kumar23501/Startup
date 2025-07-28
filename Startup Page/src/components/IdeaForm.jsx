import React, { useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const IdeaForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    founder: '',
    email: ''
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();

    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('founder', formData.founder);
    data.append('email', formData.email);
    data.append('ideaDocument', file);

    try {
      const res = await axios.post('http://localhost:5000/api/ideas/submit', data);
      setStatus('✅ Idea submitted successfully!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to submit idea.');
    }
  };

  return (
    <>
    <UserNavbar />
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card style={{ maxWidth: '600px', width: '100%', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4 text-primary">
            🚀 Submit Your Startup Idea
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Startup Title</Label>
              <Input type="text" name="title" id="title" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="description">Idea Description</Label>
              <Input type="textarea" name="description" id="description" rows="4" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="founder">Founder Name</Label>
              <Input type="text" name="founder" id="founder" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="file">Upload Idea Document (PDF/DOCX)</Label>
              <Input type="file" name="ideaDocument" id="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
            </FormGroup>
            <Button color="primary" block type="submit">Submit Idea</Button>
          </Form>
          {status && (
            <Alert color={status.includes('✅') ? 'success' : 'danger'} className="mt-3">
              {status}
            </Alert>
          )}
        </CardBody>
      </Card>
    </Container>
    </>
  );
};

export default IdeaForm;
