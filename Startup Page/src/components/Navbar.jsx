import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink as ReactstrapNavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom"; // 🚀 Import Link from React Router
import "./Navbar.css";

function GecNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="info" light expand="md" className="custom-navbar w-100">
      <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
        <img
          src="/logo.png"
          alt="GECWC Logo"
          className="me-2"
          width="60"
          height="60"
        />
        <div>
          <h4 className="mb-0">Startup Cell</h4>
          <small>Government Engineering College West Champaran, Bihar</small>
        </div>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <Nav navbar className="align-items-center">
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/">Home</ReactstrapNavLink>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/about">About us</ReactstrapNavLink>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/notice">Notice</ReactstrapNavLink>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/gallery">Gallery</ReactstrapNavLink>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/services">Services</ReactstrapNavLink>
          </NavItem>

          {/* 🔽 Login Dropdown */}
          <UncontrolledDropdown nav inNavbar className="ms-3">
            <DropdownToggle nav caret color="primary">
              Login
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/login/user">User Login</DropdownItem>
              <DropdownItem tag={Link} to="/login/institute">Institute Login</DropdownItem>
              <DropdownItem tag={Link} to="/login/admin">Admin Login</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default GecNavbar;
