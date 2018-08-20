import axios from 'axios';
import config from './../../config.js';

export const GET_PROFILE = "GET_PROFILE";

const ROOT_URL = `${config.SERVER_HOST}:${config.USER_PORT}/api`;

let token = '';
if (localStorage.getItem("token")) {
  token = JSON.parse(localStorage.getItem("token")).accessToken;
}

export function getProfile (index) {
  const request = axios.get(`${ROOT_URL}/user/${index}`,
    { headers: {"token": token}});

  return {
    type: GET_PROFILE,
    payload: request
  }
}