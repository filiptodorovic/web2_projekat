import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../index.css';
import { GoogleLogin } from '@react-oauth/google';
import RegistrationService from '../services/RegistrationService';

const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState({
    email: 'email@gmail.com',
    username: 'ema23',
    password: 'ksdjffds',
    name: 'Ema',
    lastName: 'Emic',
    dateOfBirth: '',
    address: '123212',
    pictureUrl: null,
    userType: 2,
  });

  const [confirmedPassword, setConfirmedPassword] = useState({
    confirmPassword: 'sjdhfsjdh'
  });
  // empty data
  // email: '',
  // username: '',
  // password: '',
  // confirmPassword: '',
  // name: '',
  // lastName: '',
  // dateOfBirth: '',
  // address: '',
  // userType: 'Buyer', // Default value

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await RegistrationService.registerUser(registrationData);
      // Handle the registration response as needed
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <Container className="auth-page-container">
      <Row>
      <h2 className="text-center">Register</h2>
        <Col md={6}>
        <h4 className="text-center">Register normally</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" 
              placeholder="Enter email" 
              value={registrationData.email}
              onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter username"
              value={registrationData.username}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" 
              placeholder="Password"
              value={registrationData.password}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm password" />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter name"
              value={registrationData.name}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter last name"
              value={registrationData.lastName}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date"
              value={registrationData.dateOfBirth}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter address"
              value={registrationData.address}
              onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="userType">
              <Form.Label>User Type</Form.Label>
              <Form.Control as="select"
              value={registrationData.userType}
              onChange={handleChange}>
                <option value="1">Seller</option>
                <option value="2">Buyer</option>
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
