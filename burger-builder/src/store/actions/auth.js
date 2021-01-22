import axios from 'axios';
import * as actionTypes from './actionTypes';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
  }
}

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const checkAuthTimeout = (tokenExpirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, tokenExpirationTime * 1000);
  }
}

export const auth = (email, password, isSignedUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-9gCvNNkLbpvTtwhhYO9-5oC1Ib6naLQ';
    if (!isSignedUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-9gCvNNkLbpvTtwhhYO9-5oC1Ib6naLQ'
    }
    axios.post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    }) 
  }
}