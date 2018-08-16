import axios from 'axios';

import config from './../../config.js';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN = 'LOGIN';

const ROOT_URL = `http://${config.SERVER_HOST}:${config.USER_PORT}/api/users`;

export function registerUser(props){
  const API_URL = `${ROOT_URL}/register`;
  const request = axios.post(API_URL, props, {});

  return {
    type: REGISTER_USER,
    payload: request
  }
};

export function login(props){
  const API_URL = `${ROOT_URL}/login`;
  const request = axios.post(API_URL, props, {});

  return {
    type: LOGIN,
    payload: request
  }
};
