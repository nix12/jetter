import React from 'react';
import { useSelector } from 'react-redux';

const LoggedIn = props => {
  const { children } = props;
  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);

  return isLoggedIn ? children : null;
};

export default LoggedIn;
