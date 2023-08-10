import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../index.css'; // Import custom stylesheet

const LandingPageButtons = () => {
  return (
    <Container className="landing-page-container">
      <Row className="text-center">
        <Col>
          <h1>Welcome!</h1>
          <p className="lead">Choose an option to get started:</p>
        </Col>
      </Row>
      <Row className="mt-3 text-center">
        <Col>
          <Link to="/login">
            <Button variant="primary" size="lg" block>
              Log In
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3 text-center">
        <Col>
          <Link to="/register">
            <Button variant="success" size="lg" block>
              Register
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPageButtons;