import axios from '../axiosCreator';

const BASE_URL = 'http://localhost:8000/api/v1'; // server userservice

async function getAllUser(userId) {
  try {
    const params = {};
    if(userId) {
      params.userId = userId;
    }
    const response = await axios.get(`${BASE_URL}/users`, {
      params,
  });
    return response;
  } catch (error) {
    return error.response;
  }
}

export default {
  getAllUser
};
