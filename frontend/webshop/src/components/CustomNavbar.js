import React from 'react';
import {Container,Nav,Navbar,Button,Form} from 'react-bootstrap';

const CustomNavbar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>AirShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/seller-verification">Seller Verification</Nav.Link>
              <Nav.Link href="/manage-products">Manage Products</Nav.Link>
              <Nav.Link href="/new-orders">New Orders</Nav.Link>
              <Nav.Link href="/my-orders">My Orders</Nav.Link>
              <Nav.Link href="/all-orders">All Orders</Nav.Link>
              <Nav.Link href="/previous-orders">Previous Orders</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/">
                  <Button variant="outline-danger">Log Out</Button>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default CustomNavbar;