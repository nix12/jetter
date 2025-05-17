import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-forum';

export const commentFail = (parentId, error) => {
  return {
    type: actionTypes.COMMENT_FAIL,
    parentId,
    error
  };
};

export const createComment = (
  body,
  jetId,
  postId,
  type,
  commentableId,
  commentableType,
  parentId
) => dispatch => {
  const commentData = {
    comment: {
      body,
      post_id: postId,
      commentable_id: commentableId,
      commentable_type: commentableType,
      parent_id: parentId
    }
  };

  const uri = `/api/jets/${jetId}/${type}s/${postId}/comments`;

  return axios
    .post(uri, commentData)
    .then(response => response)
    .catch(err => dispatch(commentFail(parentId, err.response.data.errors)));
};

export const updateComment = (
  body,
  jetId,
  postId,
  type,
  commentableId,
  commentableType,
  commentId
) => dispatch => {
  const commentData = {
    comment: {
      body,
      post_id: postId,
      commentable_id: commentableId,
      commentable_type: commentableType
    }
  };

  const uri = `/api/jets/${jetId}/${type}s/${postId}/comments/${commentId}`;

  return axios
    .patch(uri, commentData)
    .then(response => response)
    .catch(err => dispatch(commentFail(err.response.data.errors)));
};

export const deleteComment = (jetId, postId, type, commentId) => dispatch => {
  const uri = `/api/jets/${jetId}/${type}s/${postId}/comments/${commentId}`;

  return axios
    .delete(uri)
    .then(response => response)
    .catch(err => dispatch(commentFail(err.response.data.errors)));
};
