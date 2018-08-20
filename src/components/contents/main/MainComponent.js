import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

import MessageList from './messages/MessageList';
import UserList from './users_list/UserList';
// import SettingForm from './messages/SettingForm';
import MapComponent from './map/MapComponent';

function mapStateToProps(state) {
  return {
    position: state.app.position,
    profile: state.user.profile
  };
}

export class MainComponent extends Component {
  render() {
    let contents;

    if (this.props.position !== null && this.props.profile !== null) {
      // 필요한 정보가 모두 로드되고 난 후에 렌더링 해줘야 한다.
      contents = (
        <div className='h100'>
          {/*<SettingForm />*/}
          <MapComponent />
          <MessageList />
          <UserList />
        </div>
      );
    }

    return (
      <div className='h100'>
        {contents}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(MainComponent);
