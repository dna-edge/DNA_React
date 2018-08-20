import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AppReducer from './AppReducer';
import MessageReducer from './messages/GeoMsgReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  form: formReducer,
  messages: MessageReducer
});

export default rootReducer;
