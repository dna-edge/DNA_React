import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AppReducer from './AppReducer';
import UserReducer from './users/UserReducer';
import MessageReducer from './messages/GeoMsgReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  form: formReducer,
  messages: MessageReducer
});

export default rootReducer;
