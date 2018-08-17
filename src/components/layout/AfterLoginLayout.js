import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';

/* import Components */
import { NavAfterComponent } from './nav/NavComponents';
import { MainComponent } from './contents/ContentsComponents';;

const AfterLoginLayout = withRouter(props => <MyComponent {...props}/>);

class MyComponent extends Component {
  componentWillMount() {
    const path = this.props.location.pathname;

    if (path === "/login") {
      // 토큰이 있어 넘어왔음에도 login으로 라우팅을 시도할 경우
      // 홈으로 보내버립니다.
      this.props.history.push('/');
    } else if (path === '/logout') {
      // 로그아웃으로 넘어왔을 땐 토큰을 모두 삭제하고
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // 홈으로 보내버립니다.
      this.props.history.push('/');
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

export default AfterLoginLayout;
