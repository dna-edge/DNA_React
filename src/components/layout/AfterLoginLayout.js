import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { setGeoPosition } from './../../actions/AppActions';
import { setUserList } from './../../actions/messages/GeoMsgAction';
import { getProfile } from './../../actions/user/UserAction';

/* import Components */
import { NavAfterComponent } from './nav/NavComponents';
import MainComponent from './../contents/main/MainComponent';

const AfterLoginLayout = withRouter(props => <MyComponent {...props}/>);

function mapStateToProps(state) {
  return {
    socket: state.app.socket,
    position: state.app.position,
    profile: state.user.profile
  };
}

class MyComponent extends Component {
  componentWillMount() {
    const path = this.props.location.pathname;

    if (path === "/login") {
      // 토큰이 있어 넘어왔음에도 login으로 라우팅을 시도할 경우
      // 홈으로 보내버립니다.
      this.props.history.push('/');
      return;
    } else if (path === '/logout') {
      // 로그아웃으로 넘어왔을 땐 토큰을 모두 삭제하고
      localStorage.removeItem("token");
      // 홈으로 보내버립니다.
      this.props.history.push('/login');
      return;
    }
  }

  componentDidUpdate() {
    // 로그인 한 후에도 프로필을 가지고 있지 않다면
    // 서버에 요청해서 다시 저장합니다.
    if (this.props.profile === null) {
      this.props.getProfile(localStorage.getItem("index"));
    }
    // 소켓 설정하기 (로그인 된 상태에서만 설정해준다)
    // 1. 현재 정보 세팅
    const socket = this.props.socket;
    const path = this.props.location.pathname;

    if (this.props.position !== null && this.props.profile !== null) {
      const position = this.props.position;
      const profile = this.props.profile;

      let info = {
        customId: profile.idx,
        nickname: profile.nickname,
        avatar: profile.avatar,
        position: [position.lng, position.lat],
                  // 클라이언트의 현재 위치 정보입니다.([lng, lat] 순서)
        radius  : profile.radius
                  // 반경 몇m의 채팅을 받을 것인지를 의미하는 반지름 값입니다. TODO 커스텀하기
                  // TODO 웹 앱 동시 접속 처리 방법 구상
      };

      // 3. 연결하면서 현재 정보 서버에 전송
      socket.on('connect', function() {
        socket.emit('store', info);
      });

      // 4. 서버로 ping 전송하기
      socket.on('ping', () => {
        // 현재 path에 따라서 요구하는 정보가 달라야 합니다.
        //            /(전체 채팅)일 경우에는 위치 기준 주변 접속자 리스트를,
        //            /dm (다이렉트 메시지)일 경우에는 친구 접속자 리스트를 받습니다.
        let type = '';

        if (path === "/") {
          type = "geo";
        } else if (path === "/dm"){
          type = "dm";
        }

        info = {
          position: [position.lng, position.lat],
          radius  : profile.radius
        }

        socket.emit('update', type, info);
      });

      // 현재 접속한 유저 리스트를 받아와 state에 매핑합니다.
      socket.on("geo", (data) => {
        this.props.setUserList(data);
      });
    }
  }

  render() {
    return(
      <div className="h100">
        <NavAfterComponent />
        <BrowserRouter>
          <div className="h100calc">
              <Route exact path="/" component={MainComponent} />
          </div>
        </BrowserRouter>
      </div>
    );
  };
};

export default connect(mapStateToProps,
  { setGeoPosition, setUserList, getProfile })(AfterLoginLayout);
