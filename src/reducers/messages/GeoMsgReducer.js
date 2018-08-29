import { GET_MESSAGES, SET_USER_LIST } from './../../actions/messages/GeoMsgAction';

import { FETCH_DATA_SUCCESS } from './../../actions/index';
import checkError from './../checkError';

const INITIAL_STATE = {
  messages: null,
  users: null
}

export default function(state = INITIAL_STATE, action){
  checkError(action);

  switch(action.type) {
    case FETCH_DATA_SUCCESS:// return data and set fetching = false
      return { ...state, messages: action.payload.result };

    case GET_MESSAGES:
      return { ...state, messages: action.payload.result };

    case SET_USER_LIST:
      return {...state, users: action.payload }

    default:
      return state;
  }
}
