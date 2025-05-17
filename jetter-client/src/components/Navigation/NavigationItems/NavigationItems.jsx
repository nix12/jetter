import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import Menu from '@mui/material/MenuList';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  const { name, onClose } = props;
  const username = useSelector(state => state.auth.currentUser.username);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Menu {...props}>
      <NavigationItem
        click={onClose}
        link="/user/[username]"
        linkAs={`/user/${username}`}
        userName={username}
      >
        My Profile
      </NavigationItem>
      <NavigationItem
        click={onClose}
        link="/user/[username]/password"
        linkAs={`/user/${username}/password`}
      >
        Change Password
      </NavigationItem>
      <NavigationItem click={onClose} link="/logout" linkAs="/logout">
        Logout
      </NavigationItem>
    </Menu>
  );
};

export default navigationItems;
