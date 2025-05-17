import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  parentId: '',
  error: null,
  loading: false
};

export const commentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const commentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const commentFail = (state, action) => {
  return updateObject(state, {
    parentId: action.parentId,
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENT_START:
      return commentStart(state, action);
    case actionTypes.COMMENT_SUCCESS:
      return commentSuccess(state, action);
    case actionTypes.COMMENT_FAIL:
      return commentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
