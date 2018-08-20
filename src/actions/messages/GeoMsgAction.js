import axios from 'axios';

import config from './../../config.js';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SET_USER_LIST = 'SET_USER_LIST';
export const MESSAGE_MAKE_UPDATE = 'MESSAGE_MAKE_UPDATE';
export const MESSAGE_MAKE_NOT_UPDATE = 'MESSAGE_MAKE_NOT_UPDATE';

const ROOT_URL = `${config.SERVER_HOST}:${config.SOCKET_PORT}/api`;
let token = '';
if (JSON.parse(localStorage.getItem('token'))) {
  token = JSON.parse(localStorage.getItem('token')).accessToken;
}

export function getMessages(coords, radius, page){
  const request = axios.post(`${ROOT_URL}/message/${page}`,
    { lng: coords.lng, lat: coords.lat, radius },
    { headers: { 'token' : token } });

  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function sendMessage(values) {
  return (dispatch, getState) => {
    const state = getState();

    const messageData = {
      lng: state.app.position.longitude,
      lat: state.app.position.latitude,
      contents: values.contents
    };

    // axios로 직접 통신하지 않고 app에 직접 연결된 socket을 통해 send_message 이벤트를 발생시킨다.
    state.app.socket.emit('save_msg', token, messageData);

    dispatch({
      type: SEND_MESSAGE
    });
  }
}

export function newMessage(value) {
  return {
    type: NEW_MESSAGE,
    payload: value
  }
}

export function setUserList(value) {
  return {
    type: SET_USER_LIST,
    payload: value
  }
}
