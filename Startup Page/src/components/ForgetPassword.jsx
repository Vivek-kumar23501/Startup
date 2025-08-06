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
  Alert,
} from "reactstrap";
import axios from "axios";
import GecNavbar from "./Navbar";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/magic-login", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
    <GecNavbar />
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6" lg="5">
          <Card style={{
            width:"330px"
          }} >
            <CardBody>
              <CardTitle tag="h4" className="mb-4 text-center">Forgot Password</CardTitle>

              {message && <Alert color="success">{message}</Alert>}
              {error && <Alert color="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Enter your registered Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </FormGroup>
                <Button color="primary" block type="submit">
                  Send Magic Login Link
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ForgetPassword;
