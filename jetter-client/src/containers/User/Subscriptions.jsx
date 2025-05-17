import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Jet from '../../components/UI/Jet/Jet';

import { listSubscriptions } from '../../store/actions/index';

const Subscriptions = props => {
  const { value, index } = props;

  const [subscriptions, setSubscriptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      await dispatch(listSubscriptions()).then(response => {
        console.log('response', response);
        setSubscriptions(response);
      });
    };

    fetchSubscriptions();
  }, []);

  return (
    value === index && (
      <div>
        <h1>Subscriptions</h1>
        {console.log('asdf', subscriptions)}
        {subscriptions &&
          subscriptions.map(subscription => (
            <Jet
              key={subscription.created_at}
              jet={{ __type: 'Jet', ...subscription }}
              jetId={subscription.jet_id}
              createdAt={subscription.created_at}
            />
          ))}
      </div>
    )
  );
};

export default Subscriptions;
