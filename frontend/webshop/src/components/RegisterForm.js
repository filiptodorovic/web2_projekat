import React from 'react';
import { Button, Form } from 'react-bootstrap';

const RegisterForm = () => {
  return (
    <Form>
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

      <Button variant="success" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;