import React from 'react';
import styles from './styles.css';

import LoginForm from './users/LoginForm';
import RegisterForm from './users/RegisterForm';
import MessageList from './messages/geochat/MessageList';
import MapComponent from './maps/MapComponent';

// export const BeforeContentsComponent = () => (
//   <div className='contents-wrapper'>
//
//   </div>
// );

export const RegisterComponent = () => (
  <div className='contents-wrapper'>
    <RegisterForm />
  </div>
);

export const LoginComponent = () => (
  <div className='contents-wrapper'>
    <LoginForm />
  </div>
);

export const MainComponent = () => (
  <div className='h100'>
    <MapComponent />
    <MessageList />
  </div>
);
