import React from 'react';
import styles from './styles.css';

import MessageList from './main/messages/MessageList';
import UserList from './main/users_list/UserList';
// import SettingForm from './messages/SettingForm';
import MapComponent from './main/map/MapComponent';

export const MainComponent = () => (
  <div className='h100'>
    <div className='h100 main-left-wrapper'>
      {/*<SettingForm />*/}
      <MapComponent />
    </div>

    <MessageList />
    <UserList />
  </div>
);
