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

async function deleteUser(userId) {
  try {
    const data = {};
    if(userId) {
      data.userId = userId;
    }
    const response = await axios.delete(`${BASE_URL}/users`, {
      data,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export default {
  getAllUser,
  deleteUser,
};
