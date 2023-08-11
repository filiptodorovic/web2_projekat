import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../index.css'; // Import custom stylesheet
import { GoogleLogin } from '@react-oauth/google';


const RegisterPage = () => {
  return (
    <Container className="auth-page-container">
      <Row>
      <h2 className="text-center">Register</h2>
        <Col md={6}>
        <h4 className="text-center">Register normally</h4>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>

            <Form.Group controlId="userType">
              <Form.Label>User Type</Form.Label>
              <Form.Control as="select">
                <option value="Seller">Seller</option>
                <option value="Buyer">Buyer</option>
              </Form.Control>
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit">
                Register
              </Button>
            </div>
          </Form>
          <div className="mt-3 text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>
        <Col md={1}>
        <div class="vl"></div>
        </Col>
        <Col md={4} className="embed-content">
          <h4 className="text-center">Register via Google </h4>
          <div className="text-center google-register">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}

            theme="outline"
            shape="circle"
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
          </div>
          {/* TODO */}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
