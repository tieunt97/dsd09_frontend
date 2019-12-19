import axios from '../axiosCreator';

const BASE_URL = 'https://userservice09.herokuapp.com/api/v1'; // server userservice

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
    const response = await axios.delete(`${BASE_URL}/users`, {data});
    return response;
  } catch (error) {
    return error.response;
  }
}

async function updateUser(userId, email, name) {
  try {
    const data = {};
    if(userId) {
      data.userId = userId;
    }
    if(email) {
      data.email = email;
    }
    if(name) {
      data.name = name;
    }
    const response = await axios.put(`${BASE_URL}/users`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

async function createUser(email, name) { // tạo người dùng của admin
  try {
    const data = {};
    const password = '123456';
    if(email) {
      data.email = email;
    }
    if(name) {
      data.name = name;
    }
    data.password = password;
    const response = await axios.post(`${BASE_URL}/users`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

async function resetPassword(userId) {
  try {
    const data = {};
    if(userId) {
      data.userId = userId;
    }
    const response = await axios.put(`${BASE_URL}/users/reset-password`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

async function getRestOfRole(userId) {
  try {
    const params = {};
    if(userId) {
      params.userId = userId;
    }
    const response = await axios.get(`${BASE_URL}/users/rest-of-role`, {
      params,
  });
    return response;
  } catch (error) {
    return error.response;
  }
}

export default {
  getAllUser,
  deleteUser,
  updateUser,
  createUser,
  resetPassword,
  getRestOfRole,
};
