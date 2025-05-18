import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';
import _ from 'lodash';

import { css } from '@emotion/react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowUp from '@mui/icons-material/ArrowUpward';
import ArrowDown from '@mui/icons-material/ArrowDownward';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';

import axios from '../../../services/axios/axios-forum';
import Can from '../../Permissions/Can';
import IsLoggedIn from '../../Permissions/LoggedIn';
import RedirectToLogin from '../../Permissions/RedirectToLogin';
import { deletePost, savePost, unsavePost } from '../../../store/actions/index';

const Post = props => {
  const {
    post,
    type,
    username,
    createdAt,
    score,
    jetId,
    postId,
    title,
    body,
    comments,
    setUpdatePost,
    style
  } = props;

  const upvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/upvote`);
  const downvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/downvote`);
  const unvote = (jet, type, postId) =>
    axios.put(`/api/jets/${jet}/${type}s/${postId}/unvote`);

  const classes = {
    card: {
      width: '50em',
      display: 'flex',
      flexDirection: 'row'
    },
    info: {
      fontSize: 14
    },
    votes: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    voted: {
      color: 'orange'
    },
    score: {
      typeAlign: 'center'
    },
    user: {
      '&:hover': {
        cursor: 'pointer',
        typeDecoration: 'underline'
      }
    },
    jet: {
      fontWeight: 'bold',
      '&:hover': {
        cursor: 'pointer',
        typeDecoration: 'underline'
      }
    }
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const now = new Moment();
  const created = new Moment(createdAt);
  const duration = Moment.duration(created.diff(now)).humanize();

  const [up, setUpvote] = useState(false);
  const [down, setDownvote] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const upvotedList = useSelector(state => state.user.voter.votes.upvoted);
  const downvotedList = useSelector(state => state.user.voter.votes.downvoted);
  const savedList = useSelector(state => state.user.voter.savedList);
  const savedItems = _.map(savedList, _.head);
  const currentUser = useSelector(state => state.auth.currentUser.username);

  const upvoted = async (jet, type, postId) => {
    if (up) {
      await unvote(jet, type, postId).then(() => setUpvote(false));
    } else {
      await upvote(jet, type, postId).then(() => setUpvote(true));
    }

    setUpdatePost(true);
  };

  const downvoted = async (jet, type, postId) => {
    if (down) {
      await unvote(jet, type, postId).then(() => setDownvote(false));
    } else {
      await downvote(jet, type, postId).then(() => setDownvote(true));
    }

    setUpdatePost(true);
  };

  const switchVote = async (jet, type, postId) => {
    await unvote(jet, type, postId).then(() => {
      setUpvote(false);
      setDownvote(false);
    });

    if (up) {
      downvoted(jet, type, postId);
    }

    if (down) {
      upvoted(jet, type, postId);
    }

    setUpdatePost(true);
  };

  const removePost = () => {
    dispatch(deletePost(jetId, type, postId)).then(response => {
      if (response.status === 204) {
        router.reload();
      }
    });
  };

  const checkVote = list => {
    return _.includes(_.map(list, 'hash_id'), postId);
  };

  const savePostHandler = () => {
    if (currentUser === username) {
      dispatch(savePost(username, postId)).then(response =>
        setSavedId(response.id)
      );
    } else {
      dispatch(savePost(currentUser, postId)).then(response =>
        setSavedId(response.id)
      );
    }
  };

  const unsavePostHandler = saveId => {
    dispatch(unsavePost(username, saveId)).then(() => setSavedId(null));
  };

  useEffect(() => setUpvote(checkVote(upvotedList)), [upvotedList]);
  useEffect(() => setDownvote(checkVote(downvotedList)), [downvotedList]);

  useEffect(() => {
    const toggleSave = () => {
      if (_.includes(savedItems, postId)) {
        setSavedId(postId);
      }
    };

    toggleSave();
  }, [savedId, savedList]);

  return (
    <Card className={css`classes.card`} style={style}>
      <div className={css`classes.votes`}>
        <RedirectToLogin>
          <ArrowUp
            onClick={
              !down
                ? () => upvoted(jetId, type, postId)
                : () => switchVote(jetId, type, postId)
            }
            className={up ? css`classes.voted` : ''}
          />
        </RedirectToLogin>
        <div className={css`classes.score`}>{score}</div>
        <RedirectToLogin>
          <ArrowDown
            onClick={
              !up
                ? () => downvoted(jetId, type, postId)
                : () => switchVote(jetId, type, postId)
            }
            className={down ? css`classes.voted` : ''}
          />
        </RedirectToLogin>
      </div>
      <div>
        <CardContent>
          <Typography
            className={css`classes.info`}
            color="textSecondary"
            gutterBottom
          >
            <Link href="/j/[jetId]" as={`/j/${jetId}`}>
              <span className={css`classes.jet`}>
                j/
                {jetId}
              </span>
            </Link>
            &nbsp;&bull; Posted by&nbsp;
            <Link href="/user/[username]" as={`/user/${username}`}>
              <span className={css`classes.user`}>
                {username === '[deleted]' ? username : `u/${username}`}
              </span>
            </Link>
            &nbsp;
            {duration}
            &nbsp;ago
          </Typography>
          <Link
            href="/j/[jetId]/[type]/[postId]"
            as={`/j/${jetId}/${type}/${postId}`}
          >
            <a style={{ textDecoration: 'none' }}>
              <Typography variant="h6" component="p">
                {title}
              </Typography>
            </a>
          </Link>
          {body ? <Divider /> : null}
          <Typography variant="h6" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            href="/j/[jetId]/[type]/[postId]"
            as={`/j/${jetId}/${type}/${postId}`}
          >
            <Button size="small">
              <span>{comments}</span>
              &nbsp;comments
            </Button>
          </Link>
          <Can do="update" on={post}>
            <Link
              href="/j/[jetId]/[type]/[postId]/edit"
              as={`/j/${jetId}/${type}/${postId}/edit`}
            >
              <Button size="small">edit</Button>
            </Link>
          </Can>
          <Can do="delete" on={post}>
            <Button size="small" onClick={() => removePost}>
              delete
            </Button>
          </Can>
          <IsLoggedIn>
            {savedId ? (
              <Button size="small" onClick={() => unsavePostHandler(savedId)}>
                <Star />
                &nbsp; save
              </Button>
            ) : (
              <Button size="small" onClick={() => savePostHandler()}>
                <StarBorder />
                &nbsp; save
              </Button>
            )}
          </IsLoggedIn>
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
