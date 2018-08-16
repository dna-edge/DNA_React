import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/* for Redux */
import { connect } from 'react-redux';
import reducers from './../reducers';

import { setSocketConnected, getGeoLocation,
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
    token: state.user.all
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
    this.props.setSocketConnected();
    console.dir(this.props.socket);

    await this.props.getGeoLocation();

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

    // window.$("#map").hide();
  }

  render() {
    let renderLayout;
    if (localStorage.getItem('accessToken')) {
      renderLayout = <AfterLoginLayout />;
    } else {
      renderLayout = <BeforeLoginLayout />;
    }

    return (
      <div className="App">
        { renderLayout }
      </div>
    );
  }
}

export default connect(mapStateToProps,
  { setSocketConnected, getGeoLocation,
    setWebNotifyEnable, setWebNotifyUnable })(App);
