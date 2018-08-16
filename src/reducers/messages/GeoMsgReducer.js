import { GET_MESSAGES, SEND_MESSAGE,
  MESSAGE_MAKE_UPDATE, MESSAGE_MAKE_NOT_UPDATE }
  from './../../actions/messages/GeoMsgAction';

const INITIAL_STATE = {
  messages: [],
  message: '',
  update: false
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){

    case GET_MESSAGES:
      return { ...state, messages: action.payload.data.result }

    case MESSAGE_MAKE_UPDATE:
      return { ...state, update: true}

    case MESSAGE_MAKE_NOT_UPDATE:
      return { ...state, update: false}

    default:
      return state;
  }
}
