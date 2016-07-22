import React from 'react';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>React Starter Project</Navbar.Brand>
        </Navbar.Header>
      </Navbar>

      {children}
    </div>
  )
}

export default Layout
