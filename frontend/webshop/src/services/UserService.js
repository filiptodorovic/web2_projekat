import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_USER_CONTROLLER = process.env.REACT_APP_USER_CONTROLLER;

export const registerUser = async (registrationData) => {
    return await axios.post(
      `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/register`,
      registrationData
    );
};

export const loginUser = async (loginData) => {
  return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/log-in`,
    loginData
  );
};

export const fetchUserData = async () => {
  return await await axios.get(
    `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/profile`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
}

export const getAllSellers = async () => {
  return await await axios.get(
    `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/get-all-sellers`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
}

export const approveSeller = async (seller) => {
  return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/approve-seller`,
    seller,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
}

export const denySeller = async (seller) => {
  return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/deny-seller`, 
    seller,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
}