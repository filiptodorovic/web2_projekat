import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <Container className="auth-page-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Log In</h2>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </div>
          </Form>
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
