import React from 'react';
import {Container,Nav,Navbar,Button,Form} from 'react-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>AirShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/seller-verification">Seller Verification</Nav.Link>
            <Nav.Link href="/manage-products">Manage Products</Nav.Link>
            <Form className="d-flex">
            {/* <Nav.Link href="/">Log Out</Nav.Link> */}

                <Button variant="outline-danger" href="/">Log Out</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;