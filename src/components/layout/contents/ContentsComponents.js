import React from 'react';
import styles from './styles.css';

import MessageList from './messages/MessageList';
import SettingForm from './messages/SettingForm';
import MapComponent from './maps/MapComponent';

export const MainComponent = () => (
  <div className='h100'>
    <div className='h100 main-left-wrapper'>
      {/*<SettingForm />*/}
      <MapComponent />
    </div>

    <MessageList />
  </div>
);
