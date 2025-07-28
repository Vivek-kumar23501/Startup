import React from "react";
import { Container, Row, Col, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md="6" sm="12">
            <h5 style={
                {
                  color: "white"
                }
            }>Government Engineering College</h5>
            <p 
            style={
                {
                    color: "white",
                    
                }
            } 
            className="text-muted">
              West Champaran, Bihar — Fostering Innovation and Growth through the Startup Cell.
            </p>
          </Col>
          <Col md="3" sm="6">
            <h6>Quick Links</h6>
            <Nav vertical>
              <NavItem>
                <Link to="/" className="footer-link">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="footer-link">About Us</Link>
              </NavItem>
              <NavItem>
                <Link to="/gallery" className="footer-link">Gallery</Link>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3" sm="6">
            
            <Nav vertical>
              <NavItem>
                <a href="https://facebook.com" className="footer-link" target="_blank" rel="noreferrer">Facebook</a>
              </NavItem>
              <NavItem>
                <a href="https://instagram.com" className="footer-link" target="_blank" rel="noreferrer">Instagram</a>
              </NavItem>
              <NavItem>
                <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <hr />
        <p className="text-center text-muted mb-0">
          © {new Date().getFullYear()} GEC West Champaran. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
