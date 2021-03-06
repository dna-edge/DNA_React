import axios from 'axios';
import config from './../../config.js';

export const GET_PROFILE = "GET_PROFILE";
export const SET_USER_INDEX = "SET_USER_INDEX";

const ROOT_URL = `${config.SERVER_HOST}:${config.USER_PORT}/api`;

export function getProfile(index) {
  let token = '';
  if (sessionStorage.getItem("token")) {
    token = JSON.parse(sessionStorage.getItem("token")).accessToken;
  }

  const request = axios.get(`${ROOT_URL}/user/${index}`,
    { headers: {"token": token}});

  return {
    type: GET_PROFILE,
    payload: request
  }
}

export function setUserIndex(index) {
  return {
    type: SET_USER_INDEX,
    payload: index
  }
}
