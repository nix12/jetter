import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-forum';

export const postFail = error => {
  return {
    type: actionTypes.POST_FAIL,
    error
  };
};

export const createPost = (title, body, uri, formType, jetId) => dispatch => {
  const field = formType.charAt(0).toUpperCase() + formType.slice(1);

  const postData = {
    title,
    body,
    uri,
    type: field,
    jet_id: jetId
  };
  console.log('formType', formType);
  return axios
    .post(`/api/jets/${jetId}/${formType}s`, postData)
    .then(response => response)
    .catch(err => dispatch(postFail(err.response.data.errors)));
};

export const updatePost = (title, uri, jetId, formType, postId) => dispatch => {
  const postData = {
    post: {
      title,
      uri,
      jet_id: jetId,
      post_id: postId
    }
  };

  return axios
    .put(`/api/jets/${jetId}/${formType}/${postId}`, postData)
    .then(response => response)
    .catch(err => dispatch(postFail(err.response.data.errors)));
};

export const deletePost = (jetId, formType, postId) => dispatch => {
  return axios
    .delete(`/api/jets/${jetId}/${formType}/${postId}`)
    .then(response => response)
    .catch(err => dispatch(postFail(err.response.data.errors)));
};
