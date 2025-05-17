import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';

import Pagination from '@material-ui/lab/Pagination/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@mui/material/Button/Button';

import Post from '../../../components/UI/Post/Post';

import {
  getJet,
  listSubscriptions,
  createSubscription,
  deleteSubscription
} from '../../../store/actions/index';

const Jet = props => {
  const { jetData } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(jetData);
  const [updatePost, setUpdatePost] = useState(false);
  const [page, setPage] = useState(1);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  const subscribersCount = useSelector(
    state => state.jet.subscribers.subscribersCount
  );
  const username = useSelector(state => state.auth.currentUser.username);

  const itemsPerPage = 25;
  const router = useRouter();
  const store = useStore();
  const dispatch = useDispatch();
  const { jetId } = router.query;

  let posts;
  if (loading) {
    posts = <CircularProgress />;
  } else if (!_.isEmpty(data)) {
    posts = data.posts.map(post => (
      <Post
        key={post.hash_id}
        post={{ __type: post.type === 'Link' ? 'Link' : 'Text', ...post }}
        type={post.type.toLowerCase()}
        comments={post.comments_count}
        createdAt={post.created_at}
        postId={post.hash_id}
        jetId={post.jet_id}
        title={post.title}
        uri={post.uri}
        body={post.body}
        updatedAt={post.updated_at}
        username={post.voter_id}
        score={post.cached_votes_score}
        setUpdatePost={setUpdatePost}
      />
    ));
  } else {
    posts = <p>No posts found.</p>;
  }

  const [noOfPages] = useState(Math.ceil(posts.length / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  // const checkSubscribed = () => {
  //   if (_.includes(_.map(subscriptions, 'jet_id'), jetId)) {
  //     console.log('SUBSCRIBED');
  //     setSubscribed(true);
  //   } else {
  //     console.log('UNSUBSCRIBED');
  //     setSubscribed(false);
  //   }
  // };

  // useEffect(() => checkSubscribed(), [subscribed, subscribersCount]);

  useEffect(() => {
    const fetchJet = async () => {
      await dispatch(getJet(jetId)).then(response => {
        setData(response.jet);

        if (updatePost) {
          setUpdatePost(false);
        }
      });
    };

    fetchJet();
    setLoading(false);
  }, [updatePost, jetId, subscribersCount, subscribed]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      await dispatch(listSubscriptions()).then(response => {
        setSubscriptions(response);
      });
    };

    fetchSubscriptions();
  }, []);

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

  //   useEffect(() => {
  //     const fetchJet = async () => {
  //       const jetPosts = await dispatch(getJet(jetId));

  //       updateCurrent(jetPosts.jet);
  //       setData(jetPosts.jet);

  //       if (updatePost) {
  //         setUpdatePost(false);
  //       }
  //     };

  //     if (myPreviousState && !_.isEqual(myPreviousState, current)) {
  //       setData(current);
  //     }
  //     console.log('subscribersCount', subscribersCount);
  //     fetchJet();
  //     setLoading(false);
  //   }, [updatePost, jetId, subscribersCount]);
  // };

  // useDeepComparison(jetData);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={{ flexDirection: 'row' }}>
          Subscribers: &nbsp;
          {/* {console.log('count current', subscribersCount)} */}
          {store.getState().jet.subscribers.subscribersCount}
        </p>
        {subscribed ? (
          <Button
            onClick={async () =>
              dispatch(deleteSubscription(jetId)).then(() =>
                setSubscribed(false)
              )
            }
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            onClick={async () =>
              dispatch(createSubscription(username, jetId)).then(() =>
                setSubscribed(true)
              )
            }
          >
            Subscribe
          </Button>
        )}
      </div>
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
  );
};

Jet.getInitialProps = async ({ query, store }) => {
  const { jetId } = query;
  // const url = `/api/jets/${jetId}`;
  // const jetPosts = await axios.get(url);

  const jetPosts = await store.dispatch(getJet(jetId));

  return { jetData: jetPosts.jet };
};

export default Jet;
