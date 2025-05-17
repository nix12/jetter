import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  jet: null,
  subscribers: {
    subscribersCount: null
  },
  error: null,
  loading: false
};

export const jetStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const jetSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    jet: action.jet,
    subscribers: {
      ...state.subscribers,
      subscribersCount: action.subscribersCount
    },
    error: null,
    loading: false
  });
};

export const jetFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JET_START:
      return jetStart(state, action);
    case actionTypes.JET_SUCCESS:
      return jetSuccess(state, action);
    case actionTypes.JET_FAIL:
      return jetFail(state, action);
    default:
      return state;
  }
};

export default reducer;
