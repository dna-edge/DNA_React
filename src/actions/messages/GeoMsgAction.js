import axios from 'axios';

import config from './../../config.js';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const MESSAGE_MAKE_UPDATE = 'MESSAGE_MAKE_UPDATE';
export const MESSAGE_MAKE_NOT_UPDATE = 'MESSAGE_MAKE_NOT_UPDATE';

const ROOT_URL = `http://${config.SERVER_HOST}:${config.SOCKET_PORT}/api`;
const token = localStorage.getItem('accessToken');

export function getMessages(conversationIdx){
  const location = JSON.parse(localStorage.getItem('coord'));

  const request = axios.post(`${ROOT_URL}/message`,
    { lng: location.lng, lat: location.lat, radius: localStorage.getItem("radius") },
    { headers: { 'token' : token } });

  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function sendMessage(values, conversationIdx){
  const userIdx = JSON.parse(localStorage.getItem('profile')).idx;

  return (dispatch, getState) => {
    const state = getState();

    // axios로 직접 통신하지 않고 app에 직접 연결된 socket을 통해 send_message 이벤트를 발생시킨다.
    state.app.socket.emit('send_message', conversationIdx, userIdx, values.contents);

    dispatch({
      type: SEND_MESSAGE
    });
  }
}

export function makeUpdate(){
  return {
    type: MESSAGE_MAKE_UPDATE
  }
}

export function makeNotUpdate(){
  return {
    type: MESSAGE_MAKE_NOT_UPDATE
  }
}

export function setNaverMap() {

}
