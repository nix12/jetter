import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Moment from 'moment';

import { css } from '@emotion/react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Can from '../../Permissions/Can';
import IsLoggedIn from '../../Permissions/LoggedIn';
import RedirectToLogin from '../../Permissions/RedirectToLogin';

const Jet = props => {
  const { jet, jetId, createdAt } = props;

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

  const moment = new Moment();
  const membership = moment.utc(createdAt).format('MM/DD/YYYY');

  const savedList = useSelector(state => state.user.voter.savedList);
  const savedItems = _.map(savedList, _.head);
  const currentUser = useSelector(state => state.auth.currentUser.username);

  return (
    <Card className={css`classes.card`}>
      <div>
        <CardContent>
          <Typography
            className={css`classes.info`}
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
