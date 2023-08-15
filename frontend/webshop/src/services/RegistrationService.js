import axios from 'axios';

const BASE_URL = 'https://localhost:8800/api/user';

const RegistrationService = {
  registerUser: async (registrationData) => {
    try {
      console.log("REGDATA: ",registrationData);
      const response = await axios.post(`${BASE_URL}/register`, registrationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default RegistrationService;
