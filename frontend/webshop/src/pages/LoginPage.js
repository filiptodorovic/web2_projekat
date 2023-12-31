import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import {loginUser, loginUserGoogle} from '../services/UserService';
import '../index.css'; // Import custom stylesheet
import { useNavigate } from "react-router-dom";



const LoginPage = () => {

  let navigate = useNavigate();
    const logOut = () => {
      localStorage.clear();
      alert("Logged out!");
      navigate("/");
    };

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(loginData);
      console.log('Login response:', response.data);

      const token = response.data;
      localStorage.setItem('token', token);
      console.log(localStorage);

      alert("Successfully logged in!");

      navigate("/profile");
    } catch (error) {
      if(error.response.data)
        alert(`[Error]: ${JSON.stringify(error.response.data.message)}`);
      else
        alert("[ERROR]");
      console.log(error);
    }
  };

  return (
    <Container className="auth-page-container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={loginData.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={loginData.password} onChange={handleChange}/>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </div>
          </Form>
          <hr></hr>
          <h5 className="text-center">Or</h5>
          <div className="mt-2 text-center google-login">
          <GoogleLogin
            onSuccess={async credentialResponse => {
              console.log(credentialResponse);

              const requestData = {
                accessToken: credentialResponse.credential,
              };

              console.log(requestData);


              try {
                const response = await loginUserGoogle(requestData);
                console.log(response);
                localStorage.setItem('token', response.data);
                alert("Successfully logged in!");
                navigate("/profile");
              } catch (error) {
                console.error('Login error:', error);
                alert(`[Error]`);
              } finally {

              }

            }}

            theme="outline"
            shape="circle"
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          />
          </div>
          <div className="mt-2 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
