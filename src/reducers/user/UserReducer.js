import { GET_PROFILE } from './../../actions/user/UserAction';

const INITIAL_STATE = {
  profile: null,
  refresh: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload.data.result }

    default:
      return state;
  }
}
