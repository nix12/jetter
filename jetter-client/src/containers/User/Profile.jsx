import React from 'react';
import { useSelector } from 'react-redux';

import Can from '../../components/Permissions/Can';
import { ability } from '../../services/casl/ability';

const Profile = props => {
  const { value, index } = props;
  const user = useSelector(state => state.auth.currentUser);
  const username = useSelector(state => state.auth.currentUser.username);
  const userId = useSelector(state => state.auth.currentUser.userId);
  const roles = useSelector(state => state.auth.currentUser.roles);

  const rolesList = roles
    ? roles.map((role, index) => (
        <span key={index} style={{ display: 'block' }}>
          role {role}
        </span>
      ))
    : null;

  const abilities = ability.rules.map((rule, index) => (
    <span key={index} style={{ display: 'block' }}>
      rules [{rule.actions}: {rule.subject}]
    </span>
  ));

  return (
    value === index && (
      <div>
        <Can I="read" this={{ __type: 'User', id: user.userId }}>
          <h1>My Profile</h1>
          <h1>{user.userId}</h1>
          <h1>{`${user.username}'s Page`}</h1>
          <div>
            <span style={{ display: 'block' }}>ID: {userId}</span>
            <span style={{ display: 'block' }}>Username: {username}</span>
            <span style={{ display: 'block' }}>{rolesList}</span>
            {abilities}
          </div>
        </Can>
      </div>
    )
  );
};

export default Profile;
