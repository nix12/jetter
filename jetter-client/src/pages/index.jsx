import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import Pagination from '@mui/material/Pagination';
import Post from '../components/UI/Post/Post';

import axios from '../services/axios/axios-forum';

const All = props => {
  const { allData } = props;

  const itemsPerPage = 25;

  const [data, setData] = useState(allData);
  const [updatePost, setUpdatePost] = useState(false);
  const [page, setPage] = useState(1);

  const posts = data.posts
    .slice((page - 1) * itemsPerPage, page * itemsPerPage + 1)
    .map(post => (
      <Post
        key={post.hash_id}
        post={{ __type: post.type === 'Link' ? 'Link' : 'Text', ...post }}
        type={post.type.toLowerCase()}
        comments={post.comments_count}
        createdAt={post.created_at}
        jetId={post.jet_id}
        postId={post.hash_id}
        title={post.title}
        body={post.body}
        uri={post.uri}
        updatedAt={post.updated_at}
        username={post.voter_id}
        score={post.cached_votes_score}
        setUpdatePost={setUpdatePost}
      />
    ));

  const [noOfPages] = useState(Math.ceil(posts.length / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const useDeepComparison = initialData => {
    const myPreviousState = usePrevious(initialData);
    const [current, updateCurrent] = useState([]);

    useEffect(() => {
      const fetchAll = async () => {
        const allPosts = await axios.get('/api/all');

        updateCurrent(allPosts.data);

        if (updatePost) {
          setUpdatePost(false);
        }
      };

      if (myPreviousState && !_.isEqual(myPreviousState, current)) {
        setData(current);
      }

      fetchAll();
    }, [updatePost]);
  };

  useDeepComparison(allData);

  return data.posts.length > 0 ? (
    <div>
      {posts}
      <Pagination
        count={noOfPages}
        page={page}
        onChange={handleChange}
        defaultPage={1}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
    </div>
  ) : (
    <p>No posts found.</p>
  );
};

All.getInitialProps = async () => {
  const url = '/api/all';
  const allPosts = await axios.get(url);

  return { allData: allPosts.data };
};

export default All;
