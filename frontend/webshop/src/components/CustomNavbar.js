import React,{useState} from 'react';
import {Container,Nav,Navbar,Button,Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomNavbar = (cartItems) => {

    let navigate = useNavigate();
    const logOut = () => {
      localStorage.clear();
      alert("Logged out!");
      navigate("/");
    };

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
              <Nav.Link href="/products">Products</Nav.Link>
              {/* <Button variant="outline-primary" onClick={handleShowCartModal}>
                Cart
              </Button> */}
            </Nav>
            <Nav>
                <Nav.Link href="/">
                  <Button variant="outline-danger" onClick={logOut}>Log Out</Button>
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default CustomNavbar;