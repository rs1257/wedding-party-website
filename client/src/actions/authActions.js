import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
      .post('/api/users/register', userData)
      .then(() => history.push('/login'))
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })  
      );
};

// Login User
export const loginUser = (userData) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      // Save to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Logout User
export const logoutUser = () => dispatch => {
  // Remove token
  localStorage.removeItem('jwtToken');

  // Remove auth header
  setAuthToken(false);

  // Remove current user
  dispatch(setCurrentUser({}));
}