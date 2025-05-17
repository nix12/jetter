import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS
  };
};

export const registerFail = error => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error
  };
};

export const register = (username, password) => dispatch => {
  dispatch(registerStart());

  const url = '/api/users';

  const registerData = {
    user: {
      username,
      password,
      password_confirmation: password
    }
  };

  return axios
    .post(url, registerData)
    .then(response => {
      dispatch(registerSuccess());
    })
    .catch(err => {
      console.log(err.response.data.errors);
      const errorData = [];
      const error = {};

      Object.entries(err.response.data.errors).forEach(([key, value]) => {
        /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
        error[key] = value[0];
        errorData.push(error);
      });

      dispatch(registerFail(errorData[0]));
      return err.response.status;
    });
};
