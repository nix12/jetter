import _ from 'lodash';
import { object } from 'prop-types';
import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';
import axiosForum from '../../services/axios/axios-forum';

export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START
  };
};

export const updateSuccess = () => {
  return {
    type: actionTypes.UPDATE_SUCCESS
  };
};

export const updateFail = error => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error
  };
};

export const update = (
  username,
  currentPassword,
  password,
  passwordConfirmation
) => dispatch => {
  dispatch(updateStart());

  const url = `/api/users`;
  const userData = {
    user: {
      username,
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation
    }
  };

  return axios
    .put(url, userData)
    .then(() => {
      dispatch(updateSuccess());
    })
    .catch(err => {
      dispatch(updateFail(err.response.data.error));
    });
};

// Voter Actions

export const updateUpvoted = upvoted => {
  return {
    type: actionTypes.UPDATE_UPVOTED,
    upvoted
  };
};

export const updateDownvoted = downvoted => {
  return {
    type: actionTypes.UPDATE_DOWNVOTED,
    downvoted
  };
};

export const getUpvoted = username => dispatch => {
  const url = `/api/voters/${username}/upvoted`;

  return axiosForum.get(url).then(response => {
    dispatch(updateUpvoted(response.data.upvoted_posts));
  });
};

export const getDownvoted = username => dispatch => {
  const url = `/api/voters/${username}/downvoted`;

  return axiosForum.get(url).then(response => {
    dispatch(updateDownvoted(response.data.downvoted_posts));
  });
};

// Get saved items

export const savedItems = savedList => {
  return {
    type: actionTypes.SAVED_ITEMS,
    savedList
  };
};

// Saving Posts

export const savePost = (username, postId) => dispatch => {
  const url = `/api/voters/${username}/saved_posts`;

  const savedData = {
    saved_post: {
      post_id: postId,
      voter_id: username
    }
  };

  return axiosForum
    .post(url, savedData)
    .then(response => response.data.saved_post);
};

export const unsavePost = (username, saveId) => dispatch => {
  const url = `/api/voters/${username}/saved_posts/${saveId}`;
  return axiosForum.delete(url);
};

export const getSavedPost = (username, postId) => dispatch => {
  const url = `/api/voters/${username}/saved_posts/${postId}`;

  const savedData = {
    params: {
      voter_id: username,
      post_id: postId
    }
  };

  return axiosForum
    .get(url, savedData)
    .then(response => response.data.saved_post);
};

export const getSavedPosts = username => dispatch => {
  const url = `/api/voters/${username}/saved_posts`;

  const savedData = {
    params: {
      voter_id: username
    }
  };

  return axiosForum.get(url, savedData).then(response => {
    const postIds = _.map(response.data.saved_posts, 'post_id');
    const assignType = postIds.map(id => [id, 'post']);

    dispatch(savedItems(assignType));
  });
};

// Saving Comments

export const saveComment = (username, commentId) => dispatch => {
  const url = `/api/voters/${username}/saved_comments`;

  const savedData = {
    saved_comment: {
      comment_id: commentId,
      voter_id: username
    }
  };

  return axiosForum
    .post(url, savedData)
    .then(response => response.data.saved_comment);
};

export const unsaveComment = (username, saveId) => dispatch => {
  const url = `/api/voters/${username}/saved_comments/${saveId}`;
  return axiosForum.delete(url);
};

export const getSavedComment = (username, commentId) => dispatch => {
  const url = `/api/voters/${username}/saved_comments/${commentId}`;

  const savedData = {
    params: {
      voter_id: username,
      comment_id: commentId
    }
  };

  return axiosForum
    .get(url, savedData)
    .then(response => response.data.saved_comment);
};

export const getSavedComments = username => dispatch => {
  const url = `/api/voters/${username}/saved_comments`;

  const savedData = {
    params: {
      voter_id: username
    }
  };

  return axiosForum.get(url, savedData).then(response => {
    const commentIds = _.map(response.data.saved_comments, 'comment_id');
    const assignType = commentIds.map(id => [id, 'comment']);

    dispatch(savedItems(assignType));
  });
};

// Batch requests

export const getSavedItems = (username, savedList) => dispatch => {
  const url = `/api/batch`;

  const batch = {
    requests: []
  };
  // console.log('[SAVED LIST]', savedList)
  savedList.map(saved => {
    // console.log('[Saved]', saved);
    if (saved[1] === 'post') {
      batch.requests.push({
        method: 'GET',
        url: `/api/voters/${username}/saved_posts/${saved[0]}?${
          process.env.KONG_JWT
        }`,
        body: {
          voter_id: username,
          post_id: saved[0]
        }
      });
    } else {
      batch.requests.push({
        method: 'GET',
        url: `/api/voters/${username}/saved_comments/${saved[0]}?${
          process.env.KONG_JWT
        }`,
        body: {
          voter_id: username,
          comment_id: saved[0]
        }
      });
    }
  });

  return axiosForum.post(url, batch).then(response => {
    const parsed = _.flatMap(response.data.responses, data =>
      JSON.parse(data.body)
    );

    const ids = _.map(
      parsed,
      _.partialRight(_.pick, ['saved_post.post_id', 'saved_comment.comment_id'])
    );

    const result = _.flatMap(ids, id => {
      const postId = id.saved_post ? id.saved_post.post_id : null;
      const commentId = id.saved_comment ? id.saved_comment.comment_id : null;

      return _.values({
        id: postId || commentId || []
      });
    });

    return result;
  });
};
