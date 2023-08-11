import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import '../index.css'; // Import custom stylesheet

const ProfilePage = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    userType: '',
    verificationStatus: '',
    pictureUrl: '',
  });

  useEffect(() => {
    // Fetch user data from an API or other source
    // For now, let's set dummy data
    const fetchedUser = {
      email: 'john@example.com',
      username: 'john_doe',
      name: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      address: '123 Main St, City',
      userType: 'Seller',
      verificationStatus: 'Verified',
      pictureUrl: 'https://keystoneacademic-res.cloudinary.com/image/upload/element/15/159403_Eleceng.jpg',
    };

    setUser(fetchedUser);
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    // Perform any logout actions here
  
    // Redirect to the root page
    window.location.href = '/';
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here

    setIsEditing(false); // Exit editing mode
  };

  const handlePictureUpload = (event) => {
    // Handle picture upload logic here
  };

  return (
    <div>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>My Profile</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            {/* Add any additional Navbar items here */}
        </Nav>
        <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Container>
       
        <div className="profile-container">
        <div className="profile-details">
            <div className="profile-header text-center">
                <h2>{user.name} {user.lastName}</h2>
            </div>
            <Row>
            <Col md={2}></Col>
            <Col md={4}>
            <div className="profile-picture">
                <img src={user.pictureUrl} alt="Profile" />
                <Form>
                <Form.Group controlId="pictureUpload">
                <label for="formFile" class="form-label">Change/Upload picture</label>
                <input class="form-control" type="file" id="formFile"/>
                <Button variant="secondary" onClick={handleEditClick} class="wider-button">
                    Upload
                </Button>
                </Form.Group>
            </Form>
            </div>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
            <div className="profile-section">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>User Type:</strong> {user.userType}</p>
                {user.userType === 'Seller' && (
                <p><strong>Verification Status:</strong> {user.verificationStatus}</p>
                )}
            </div>
            </Col>
            </Row>
            <Container className="edit-profile-container">

            <h2> Edit user data</h2>
            <Form>
                <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
                {/* Add more form fields for other user data */}
            </Form>
            <Form>
                <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={user.username} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
                {/* Add more form fields for other user data */}
            </Form>
            <Form>
                <Form.Group controlId="dateofbirth">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type="date" value={user.dateOfBirth} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
                {/* Add more form fields for other user data */}
            </Form>
            <Form>
                <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={user.email} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
                {/* Add more form fields for other user data */}
            </Form>


            {isEditing ? (
                <Button variant="primary" onClick={handleSaveClick} class="wider-button">
                Save
                </Button>
            ) : (
                <Button variant="secondary" onClick={handleEditClick} class="wider-button">
                Edit
                </Button>
            )}
            </Container>

        </div>
    </div>
  </Container>
  </div>
  );
};

export default ProfilePage;