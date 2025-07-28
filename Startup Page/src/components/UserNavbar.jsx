// components/UserNavbar.jsx
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UserNavbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching user profile:", err));
  }, []);

  return (
    <Navbar color="light" light expand="md" className="custom-navbar w-100 shadow-sm">
      <NavbarBrand tag={NavLink} to="/" className="d-flex align-items-center">
        <img
          src="/public/logo.png"
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
            <NavLink
              to="/user-dashboard"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/events"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Events
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/mentors"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Mentors
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/submit-idea"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Submit Idea
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar className="ms-3">
            <DropdownToggle nav caret color="primary">
              {user ? user.name : 'Loading...'}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={NavLink} to="/profile">My Profile</DropdownItem>
              <DropdownItem tag={NavLink} to="/">Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default UserNavbar;
