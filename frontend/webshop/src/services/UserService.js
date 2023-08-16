import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_USER_CONTROLLER = process.env.REACT_APP_USER_CONTROLLER;

export const registerUser = async (registrationData) => {
    return await axios.post(
      `${REACT_APP_BASE_URL}/${REACT_APP_USER_CONTROLLER}/register`,
      registrationData
    );
};

