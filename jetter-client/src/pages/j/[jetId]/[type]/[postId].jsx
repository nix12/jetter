import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';

import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import Post from '../../../../components/UI/Post/Post';
import Comment from '../../../../components/UI/Comment/Comment';
import CommentForm from '../../../../components/Forms/Comment';

import axios from '../../../../services/axios/axios-forum';

const Show = props => {
  const { postData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(postData);
  const [updatePost, setUpdatePost] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [toggleReply, setToggleReply] = useState(true);
  const router = useRouter();
  const { jetId, type, postId } = router.query;
  let comments;

  const renderComment = comment => {
    return comment.map(child => (
      <Comment
        key={child.hash_id}
        comment={{ __type: 'Comment', ...child }}
        body={child.body}
        comments={child.comments_count}
        createdAt={child.created_at}
        commentId={child.hash_id}
        jetId={child.jet_id}
        updatedAt={child.updated_at}
        username={child.voter_id}
        score={child.cached_votes_score}
        nestedComments={renderComment(child.children)}
        depth={child.ancestry_depth}
        setUpdateComment={setUpdateComment}
      />
    ));
  };

  if (loading) {
    comments = <CircularProgress />;
  } else if (!_.isEmpty(data.comments)) {
    comments = data.comments.map(comment => renderComment(comment));
  } else {
    comments = <p>No comments found.</p>;
  }

  // const usePrevious = value => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };

  // const useDeepComparison = initialData => {
  //   const myPreviousState = usePrevious(initialData);
  //   const [current, updateCurrent] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await axios.get(`/api/jets/${jetId}/${type}s/${postId}`);

      // updateCurrent(postData.data);
      setData(postData.data);
      if (updateComment) {
        setUpdateComment(false);
      }
    };

    // if (myPreviousState && !_.isEqual(myPreviousState, current)) {
    //   setData(current);
    // }

    fetchPost();
    setLoading(false);
  }, [updateComment, updatePost, postId]);
  // };

  // useDeepComparison(postData);

  const parentId = useSelector(state => state.comment.parentId);
  const error = useSelector(state => state.comment.error);
  let errorMessage = null;
  if (error && !parentId) {
    errorMessage = Object.entries(error).map(([key, value]) => {
      const field = key.charAt(0).toUpperCase() + key.slice(1);

      return value.map(v => (
        <Alert key={v} severity="error">
          {field}: {v}
        </Alert>
      ));
    });
  }

  return (
    <div>
      <Post
        post={{
          __type: data.post.type === 'Post' ? 'Link' : 'Text',
          ...data.post
        }}
        type={data.post.type.toLowerCase()}
        body={data.post.body}
        comments={data.post.comments_count}
        createdAt={data.post.created_at}
        jetId={data.post.jet_id}
        postId={data.post.hash_id}
        title={data.post.title}
        uri={data.post.uri}
        updatedAt={data.post.updated_at}
        username={data.post.voter_id}
        score={data.post.cached_votes_score}
        setUpdatePost={setUpdatePost}
      />
      {errorMessage}
      <CommentForm
        rows="15"
        cols="65"
        setToggle={setToggleReply}
        toggle={toggleReply}
        setUpdateComment={setUpdateComment}
      />
      {comments}
    </div>
  );
};

Show.getInitialProps = async ({ query }) => {
  const { jetId, type, postId } = query;
  const url = `/api/jets/${jetId}/${type}s/${postId}`;

  const post = await axios.get(url);

  return { postData: post.data };
};

export default Show;
