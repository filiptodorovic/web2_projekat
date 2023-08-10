import React from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
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

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;