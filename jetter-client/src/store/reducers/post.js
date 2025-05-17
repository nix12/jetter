import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false
};

export const postStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const postSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const postFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_START:
      return postStart(state, action);
    case actionTypes.POST_SUCCESS:
      return postSuccess(state, action);
    case actionTypes.POST_FAIL:
      return postFail(state, action);
    default:
      return state;
  }
};

export default reducer;
