import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import '../index.css'; // Import custom stylesheet
import { fetchUserData,uploadProfilePicture } from '../services/UserService';
import User from '../models/User'

const ProfilePage = () => {

const [editedFile, setEditedFile] = useState([]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(new User()); // Initialize with an instance of User

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        const date = userData.data.dateOfBirth.split('T')[0];
        setUser(new User(
          userData.data.email,
          userData.data.username,
          userData.data.name,
          userData.data.lastName,
          date,
          userData.data.address,
          userData.data.userType,
          userData.data.verificationStatus,
          userData.data.pictureUrl
        ));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here

    setIsEditing(false); // Exit editing mode
  };

  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedFile({ ...editedFile, photoFile: file, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

   const handleChangePhoto = async () => {
    try {
      // Create product data to send
      const photoData = {
        Picture: editedFile.photoFile ? await convertToBase64(editedFile.photoFile) : null
      };

      console.log("Photo data:",photoData);

      // Add product via API call
      const userData = await uploadProfilePicture(photoData);

      console.log("Response:",userData);


      const date = userData.data.dateOfBirth.split('T')[0];
      setUser(new User(
        userData.data.email,
        userData.data.username,
        userData.data.name,
        userData.data.lastName,
        date,
        userData.data.address,
        userData.data.userType,
        userData.data.verificationStatus,
        userData.data.pictureUrl
      ));


    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error or update UI accordingly
    }
  };

  const showUser = (param) => {
    switch(param) {
      case 0:
        return 'Admin';
      case 1:
        return 'Seller';
      case 2:
        return 'Buyer';
      default:
        return 'Buyer';
    }
  };

  const getVerificationStatus = (param) => {
    switch(param) {
      case 0:
        return 'Approved';
      case 1:
        return 'Denied';
      case 2:
        return 'Pending';
      default:
        return 'Buyer';
    }
  };

  return (
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
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png" // Allow only image file types
                  onChange={handlePictureUpload}
                  />
                <Button variant="secondary" onClick={handleChangePhoto} class="wider-button">
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
                <p><strong>User Type:</strong> {showUser(user.userType) }</p>
                {user.userType === 1 && (
                <p><strong>Verification Status:</strong> {getVerificationStatus(user.verificationStatus)}</p>
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
            </Form>
            <Form>
                <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={user.username} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="dateofbirth">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control type="date" value={user.dateOfBirth} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={user.email} readOnly={!isEditing} disabled={!isEditing}/>
                </Form.Group>
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
  );
};

export default ProfilePage;
