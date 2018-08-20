import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

/* for Redux */
import { connect } from 'react-redux';
import reducers from './../reducers';

import { setSocketConnected, setGeoPosition,
  setWebNotifyEnable, setWebNotifyUnable } from './../actions/AppActions';

/* import Components */
import BeforeLoginLayout from './layout/BeforeLoginLayout';
import AfterLoginLayout from './layout/AfterLoginLayout';

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function mapStateToProps(state) {
  return {
    notiGrant: state.app.notiGrant,
    socket: state.app.socket,
    position: state.app.position
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  // 앱이 시작될 때 Fetch 해오기 시작
  async componentWillMount() {
    await this.props.setSocketConnected();
    await this.props.setGeoPosition();

    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      this.props.setWebNotifyUnable();
    } else if (!this.props.notiGrant) {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          this.props.setWebNotifyEnable();
        } else {
          this.props.setWebNotifyUnable();
        }
      });
    }
  }

  render() {
    console.log('render');
    let renderLayout;

    if (localStorage.getItem('token')) {
      renderLayout = <AfterLoginLayout />;
    } else {
      renderLayout = <BeforeLoginLayout />;
    }

    return (
      <BrowserRouter>
        { renderLayout }
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps,
  { setSocketConnected, setGeoPosition,
    setWebNotifyEnable, setWebNotifyUnable })(App);
