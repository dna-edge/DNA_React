import axios from 'axios';

import config from './../../config.js';

export const LOGIN = 'LOGIN';

const ROOT_URL = `${config.SERVER_HOST}:${config.USER_PORT}/api/users`;

export function login(props){
  const API_URL = `${ROOT_URL}/login`;
  const request = axios.post(API_URL, props, {});

  return {
    type: LOGIN,
    payload: request
  }
};
