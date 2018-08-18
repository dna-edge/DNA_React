import axios from 'axios';
import io from 'socket.io-client';

import config from './../config.js';

export const SET_WEB_NOTIFY_ENABLE = 'SET_WEB_NOTIFY_ENABLE';
export const SET_WEB_NOTIFY_UNABLE = 'SET_WEB_NOTIFY_UNABLE';
export const GET_GEO_LOCATION = 'GET_GEO_LOCATION';
export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';
// export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
// export const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE';

const USER_API_URL = `http://${config.SERVER_HOST}:${config.USER_PORT}/api`;
const SOCKET_API_URL = `http://${config.SERVER_HOST}:${config.SOCKET_PORT}`;
const token = localStorage.getItem('accessToken');
//
// export function getNewMessage(messageIdx) {
//   const request = axios.get(`${CHAT_URL}/message/${messageIdx}`, {headers: {'token' : token}});
//
//   return{
//     type: FETCH_NEW_MESSAGE,
//     payload: request
//   };
// }

export function setSocketConnected() {
  let socket = null;
  if(token !== null && token !== undefined) {
    // 1. 해당 포트로 소켓 생성
    socket = io(SOCKET_API_URL, {transports: ['websocket']}, {secure: true});

    // 2. 현재 정보 세팅
    if (localStorage.getItem('coord')){
      const location = JSON.parse(localStorage.getItem('coord'));
      let info = {
        customId: JSON.parse(localStorage.getItem('profile')).idx,
                  // TODO 웹 앱 동시 접속 처리 방법 구상
        location: [location.lng, location.lat],
                  // 클라이언트의 현재 위치 정보입니다.([lng, lat] 순서)
        radius  : localStorage.getItem("radius")
                  // 반경 몇m의 채팅을 받을 것인지를 의미하는 반지름 값입니다. TODO 커스텀하기
      };

      // 3. 연결하면서 현재 정보 서버에 전송
      socket.on('connect', function() {
        socket.emit('store', info);
      });

      // 4. 서버로 ping 전송하기
      socket.on('ping', () => {
        getGeoLocation();
        const location = JSON.parse(localStorage.getItem('coord'));

        info = {
          location: [location.lng, location.lat],
          radius  : localStorage.getItem("radius")
        }
        // TODO 유저의 현재 상태를 업데이트해서 info로 전달
        socket.emit('update', info);
      });
    }
  }

  return {
    type: SET_SOCKET_CONNECTED,
    payload: socket
  };
}
//
// export function getNewNotiCount() {
//   const request = axios.get(`${API_URL}/newnoti`, {headers: {'token' : token}});
//
//   return {
//     type: GET_NEW_NOTI_COUNT,
//     payload: request
//   }
// }
//
// export function getNewMessageCount() {
//   const request = axios.get(`${CHAT_URL}/newmessages`, {headers: {'token' : token}});
//
//   return {
//     type: GET_NEW_MESSAGE_COUNT,
//     payload: request
//   }
// }

export function setWebNotifyEnable() {
  return {
    type: SET_WEB_NOTIFY_ENABLE
  };
}

export function setWebNotifyUnable() {
  return {
    type: SET_WEB_NOTIFY_UNABLE
  };
}

export function getGeoLocation() {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });

  return {
    type: GET_GEO_LOCATION,
    payload: location
  }
};
