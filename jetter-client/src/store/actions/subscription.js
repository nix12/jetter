import axios from '../../services/axios/axios-forum';
import * as actionTypes from './actionTypes';

export const listSubscriptions = () => dispatch => {
  const url = '/api/subscriptions';

  return axios.get(url).then(response => response.data.subscriptions);
};

export const createSubscription = (username, jetId) => dispatch => {
  const url = '/api/subscriptions';

  const subscriptionData = {
    jet_id: jetId,
    voter_id: username
  };

  return axios.post(url, subscriptionData).then(response => response);
};

export const deleteSubscription = jetId => dispatch => {
  const url = `/api/subscriptions/${jetId}`;

  return axios.delete(url);
};