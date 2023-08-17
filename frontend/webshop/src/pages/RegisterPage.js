import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Form as BootstrapForm  } from 'react-bootstrap';
import '../index.css';
import { GoogleLogin } from '@react-oauth/google';
import {registerUser} from '../services/UserService';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import registrationValidationSchema from '../components/registrationValidationSchema'

const RegisterPage = () => {

  const formFields = [
    { name: 'email', type: 'email', placeholder: 'Enter email' },
    { name: 'username', type: 'text', placeholder: 'Enter Username' },
    { name: 'password', type: 'password', placeholder: 'Enter Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
    { name: 'name', type: 'text', placeholder: 'Enter Name' },
    { name: 'lastName', type: 'text', placeholder: 'Enter Last Name' },
    { name: 'dateOfBirth', type: 'date', placeholder: 'Enter Date of Birth' },
    { name: 'address', type: 'text', placeholder: 'Enter Address' },
  ];


  const handleSubmitForm = async (values, { setSubmitting }) => {
    console.log('Register values:', values);
    try {
      const response = await registerUser(values);
      console.log('Registration success:', response);
      alert("Successfully registered!");
    } catch (error) {
      
      console.error('Registration error:', error);
      alert(`[Error]: ${JSON.stringify(error.response.data.message)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="auth-page-container">
      <Row>
      <h2 className="text-center">Register</h2>
        <Col md={6}>
        <h4 className="text-center">Register normally</h4>
        <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
              name: '',
              lastName: '',
              dateOfBirth: '',
              address: '',
              userType: 2,
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={handleSubmitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* ... Your form fields ... */}
                {formFields.map((field) => (
                  <React.Fragment key={field.name}>
                  <BootstrapForm.Group controlId={field.name}>
                    <BootstrapForm.Label>{field.placeholder}</BootstrapForm.Label>
                    <Field
                      type={field.type}
                      name={field.name}
                      className="form-control"
                      placeholder={field.placeholder}
                    />
                    <ErrorMessage name={field.name} component="div" className="error error-text" />
                  </BootstrapForm.Group>
                </React.Fragment>
                ))}

                {/* ... Other fields ... */}

                <BootstrapForm.Group controlId="userType">
                <BootstrapForm.Label>User Type</BootstrapForm.Label>
                <Field
                  as="select"
                  name="userType"
                  className="form-control"
                >
                  <option value="1">Seller</option>
                  <option value="2">Buyer</option>
                </Field>
              </BootstrapForm.Group>

              {/* Register Button */}
              <div className='text-center'>
                <Button
                  variant="success"
                  type="submit"
                  disabled={isSubmitting}
                  className="register-button"
                >
                  Register
                </Button>
                </div>
              </Form>
            )}
          </Formik>
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
