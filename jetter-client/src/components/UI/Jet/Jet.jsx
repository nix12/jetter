import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@mui/material/Button';import Typography from '@material-ui/core/Typography';

import Can from '../../Permissions/Can';
import IsLoggedIn from '../../Permissions/LoggedIn';
import RedirectToLogin from '../../Permissions/RedirectToLogin';

const useStyles = makeStyles({
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
});

const Jet = props => {
  const { jet, jetId, createdAt } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const moment = new Moment();
  const membership = moment.utc(createdAt).format('MM/DD/YYYY');

  const savedList = useSelector(state => state.user.voter.savedList);
  const savedItems = _.map(savedList, _.head);
  const currentUser = useSelector(state => state.auth.currentUser.username);

  return (
    <Card className={classes.card}>
      <div>
        <CardContent>
          <Typography
            className={classes.info}
            color="textSecondary"
            gutterBottom
          >
            <span>
              member since &nbsp;
              {membership}
            </span>
          </Typography>
          <Typography variant="h6" component="p">
            {jetId}
          </Typography>
        </CardContent>
        <CardActions>
          <Can do="delete" on={jet}>
            <Button size="small" onClick={() => 'delete subscription'}>
              unsubscribe
            </Button>
          </Can>
        </CardActions>
      </div>
    </Card>
  );
};

export default Jet;
