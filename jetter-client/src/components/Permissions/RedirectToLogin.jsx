import React from 'react';
import { useSelector } from 'react-redux';

import redirectTo from '../../shared/redirectTo';

const RedirectToLogin = props => {
  const { children } = props;

  const isLoggedIn = useSelector(state => state.auth.currentUser.isLoggedIn);

  const redirectHandler = event => {
    event.stopPropagation();

    if (isLoggedIn) {
      return null;
    }

    redirectTo('/login');
  };

  return isLoggedIn ? (
    <div>{children}</div>
  ) : (
    <div
      onClickCapture={event => redirectHandler(event)}
      onKeyDownCapture={event => redirectHandler(event)}
      role="link"
      tabIndex="0"
    >
      {children}
    </div>
  );
};

export default RedirectToLogin;
