import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false
};

export const registerStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const registerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const registerFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
