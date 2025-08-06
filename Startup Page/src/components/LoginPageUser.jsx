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
//import "./LoginPageuser.css";
import GecNavbar from "./Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "institute") {
        navigate("/institute-dashboard");
      } else if (response.data.role === "user") {
        navigate("/user-dashboard");
      } else {
        setError("Unknown role.");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <GecNavbar />

      <div className="login-wrapper">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Row className="w-100 justify-content-center px-2">
            <Col xs="12" sm="10" md="8" lg="5">
              <Card style={{
              
                width: "300px"
              }} className="shadow-lg login-card">
                <CardBody>
                  <CardTitle tag="h4" className="text-center mb-4 text-primary">
                    Login to Your Account
                  </CardTitle>

                  {error && <Alert color="danger" fade={false}>{error}</Alert>}

                  <Form onSubmit={handleLogin}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </FormGroup>

                    <Button color="primary" className="w-100 mt-3 login-btn" type="submit">
                      Login
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    <Link to="/register" className="text-decoration-none text-primary">
                      Create New Account
                    </Link>
                    </div>
                    <div className="text-center mt-3" >
                     <Link to="/forgot-password" className="text-decoration-none text-primary">
                      Forget Password?
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

export default LoginPage;
