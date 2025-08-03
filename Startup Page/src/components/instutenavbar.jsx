import React, { useState, useEffect } from 'react';
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
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InstituteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [institute, setInstitute] = useState(null);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios
      .get('/api/institute/profile')
      .then((res) => setInstitute(res.data))
      .catch((err) => console.error('Error fetching institute profile:', err));
  }, []);

  return (
    <Navbar color="info" light expand="md" className="custom-navbar w-100 shadow-sm px-3">
      <NavbarBrand tag={Link} to="/" className="d-flex align-items-center">
        <img
          src="/public/logo.png"
          alt="GECWC Logo"
          className="me-2"
          width="60"
          height="60"
        />
        <div>
          <h4 className="mb-0">Institute Panel</h4>
          <small>Startup Cell - GEC West Champaran</small>
        </div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <Nav navbar className="align-items-center">
          <NavItem>
            <ReactstrapNavLink tag={Link} to="/institute/dashboard">
              Dashboard
            </ReactstrapNavLink>
          </NavItem>
    <NavItem>
  <ReactstrapNavLink tag={Link} to="/institute/create-notice">
    Create Notice
  </ReactstrapNavLink>
</NavItem>
          {/* Additional Quick Nav Items */}
          <NavItem>
            <ReactstrapNavLink tag={Link} to="view-startup-ideas">
              Startup Ideas
            </ReactstrapNavLink>
          </NavItem>

          <NavItem>
            <ReactstrapNavLink tag={Link} to="/institute/applications">
              Applied Candidates
            </ReactstrapNavLink>
          </NavItem>

          <NavItem>
            <ReactstrapNavLink tag={Link} to="/institute/gallery">
              Gallery
            </ReactstrapNavLink>
          </NavItem>

          {/* Dropdown */}
          <UncontrolledDropdown nav inNavbar className="ms-3">
            <DropdownToggle nav caret color="primary">
              {institute ? institute.name : 'Loading...'}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to="/institute/profile">
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/">Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default InstituteNavbar;
