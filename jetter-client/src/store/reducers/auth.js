import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  currentUser: {
    isLoggedIn: false,
    userId: null,
    username: null,
    roles: [],
    rules: []
  },
  loading: false,
  error: null
};

export const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const authSuccess = (state, action) => {
  return updateObject(state, {
    currentUser: {
      isLoggedIn: true,
      userId: action.userId,
      username: action.username,
      roles: action.roles,
      rules: action.rules
    },
    error: null,
    loading: false
  });
};

export const authFail = (state, action) => {
  return updateObject(state, {
    currentUser: {
      isLoggedIn: false,
      userId: null,
      username: null,
      roles: [],
      rules: []
    },
    error: action.error,
    loading: false
  });
};

export const authLogout = (state, action) => {
  return updateObject(state, {
    currentUser: {
      isLoggedIn: false,
      userId: null,
      username: null,
      roles: [],
      rules: []
    }
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
