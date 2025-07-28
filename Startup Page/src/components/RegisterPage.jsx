import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";
import GecNavbar from "./Navbar"; // ✅ Importing the Navbar

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("https://startup-w0fm.onrender.comr", formData);
      setSuccess("Registration successful. Please check your email to verify.");
      setError("");
      setFormData({
        name: "",
        email: "",
        rollNumber: "",
        registrationNumber: "",
        password: "",
        confirmPassword: "",
        role: "user"
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <>
      <GecNavbar /> {/* ✅ Navbar added */}

      <div className="register-wrapper">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Row className="w-100 justify-content-center">
            <Col md="8" lg="6">
              <Card className="shadow-lg">
                <CardBody>
                  <CardTitle tag="h4" className="text-center text-primary mb-4">
                    Student Registration
                  </CardTitle>

                  {error && <Alert color="danger" fade={false}>{error}</Alert>}
                  {success && <Alert color="success" fade={false}>{success}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">Full Name</Label>
                      <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="rollNumber">Roll Number</Label>
                      <Input type="text" name="rollNumber" id="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="registrationNumber">Registration Number</Label>
                      <Input type="text" name="registrationNumber" id="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </FormGroup>

                    <Button color="primary" className="w-100 mt-3" type="submit">
                      Register
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login/user" className="text-decoration-none text-primary">
                      Login here
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterPage;
