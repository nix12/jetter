import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import Can from '../../components/Permissions/Can';
import Post from '../../components/UI/Post/Post';
import Comment from '../../components/UI/Comment/Comment';

import axios from '../../services/axios/axios-forum';
import redirectTo from '../../shared/redirectTo';

const SavedItems = props => {
  const { value, index } = props;
  // const user = useSelector(state => state.auth.currentUser);

  const [data, setData] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);

  const userId = useSelector(state => state.auth.currentUser.userId);
  const username = useSelector(state => state.auth.currentUser.username);

  useEffect(() => {
    const fetchSavedItems = async () => {
      const savedItems = await axios.get(`/api/voters/${username}/saved_items`);

      setData(savedItems.data.saved_items);
    };

    if (username) {
      fetchSavedItems();
    }
  }, [username, updateComment, updatePost]);

  return (
    value === index && (
      <Can I="read" this={{ __type: 'User', id: userId }}>
        <h1>Saved Items</h1>
        {data.map(post => {
          if (!post.title) {
            return (
              <Comment
                key={post.hash_id}
                comment={{ __type: 'Comment', ...post }}
                body={post.body}
                comments={post.comments_count}
                createdAt={post.created_at}
                commentId={post.hash_id}
                jetId={post.jet_id}
                updatedAt={post.updated_at}
                username={post.voter_id}
                score={post.cached_votes_score}
                depth={post.depth}
                setUpdateComment={setUpdateComment}
                style={{ backgroundColor: 'yellow' }}
              />
            );
          }

          return (
            <Post
              key={post.hash_id}
              post={{
                __type: post.type === 'Post' ? 'Link' : 'Text',
                ...post
              }}
              type={post.type ? post.type.toLowerCase() : null}
              body={post.body}
              comments={post.comments_count}
              createdAt={post.created_at}
              jetId={post.jet_id}
              postId={post.hash_id}
              title={post.title}
              uri={post.uri}
              updatedAt={post.updated_at}
              username={post.voter_id}
              score={post.cached_votes_score}
              setUpdatePost={setUpdatePost}
              style={{ backgroundColor: 'lightblue' }}
            />
          );
        })}
      </Can>
    )
  );
};

SavedItems.getInitialProps = async ({ res, isServer }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token && !isServer) {
    redirectTo('/login');
  }

  return {};
};

export default SavedItems;
