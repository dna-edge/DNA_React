import { SET_WEB_NOTIFY_ENABLE, SET_WEB_NOTIFY_UNABLE,
          GET_GEO_LOCATION, SET_SOCKET_CONNECTED }
  from '../actions/AppActions.js';

let notiGrant = '';

if (Notification.permission === 'granted') {
  notiGrant = true;
} else {
  notiGrant = false;
}

const initialState = {
  notiGrant,
  socket: null,
  location: []
};

export default function data (state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET_CONNECTED:
      return { ...state, socket: action.payload };

    case SET_WEB_NOTIFY_ENABLE:
      return { ...state, notiGrant: true};

    case SET_WEB_NOTIFY_UNABLE:
      return { ...state, notiGrant: false};

    case GET_GEO_LOCATION:
      // localStorage.setItem('coord', JSON.stringify({
      //   lng: action.payload.coords.longitude,
      //   lat: action.payload.coords.latitude
      // }));
      return {  ...state, location: action.payload.coords };

    default:
      return state;
  }
}
