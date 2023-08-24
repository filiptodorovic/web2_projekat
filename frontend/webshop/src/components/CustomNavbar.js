import React,{useState} from 'react';
import {Container,Nav,Navbar,Button,Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({userRole,verificationStatus}) => {

    let navigate = useNavigate();
    const logOut = () => {
      localStorage.clear();
      navigate("/");
    };

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>AirShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              { userRole &&<Nav.Link href="/profile">Profile</Nav.Link>}
              { userRole==='ADMIN'&&<Nav.Link href="/seller-verification">Seller Verification</Nav.Link>}
              { userRole==='SELLER' && verificationStatus==='APPROVED' &&<Nav.Link href="/manage-products">Manage Products</Nav.Link>}
              { userRole==='SELLER' && verificationStatus==='APPROVED' &&<Nav.Link href="/new-orders">New Orders</Nav.Link>}
              { userRole==='SELLER' && verificationStatus==='APPROVED' &&<Nav.Link href="/my-orders">My Orders</Nav.Link>}
              { userRole==='ADMIN' &&<Nav.Link href="/all-orders">All Orders</Nav.Link>}
              { userRole==='BUYER' &&<Nav.Link href="/previous-orders">Previous Orders</Nav.Link>}
              { userRole==='BUYER' &&<Nav.Link href="/products">Products</Nav.Link>}
            </Nav>
            {userRole && <Nav>
                <Nav.Link href="/">
                  <Button variant="outline-danger" onClick={logOut}>Log Out</Button>
                </Nav.Link>
            </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default CustomNavbar;