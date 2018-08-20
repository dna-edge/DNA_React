import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import { getMessages } from './../../../../actions/messages/GeoMsgAction';
import { setGeoPosition } from './../../../../actions/AppActions';
import { fetchDataSuccess, fetchDataFailure } from './../../../../actions/index';

import Message from './Message';
import MessageForm from './MessageForm';

import styles from './styles.css';
import config from './../../../../config';

function mapStateToProps(state) {
  return {
    socket: state.app.socket,
    position: state.app.position,
    messages: state.messages.messages
  };
}

class MessageList extends Component {
  constructor(props){
    super(props);

    this.before;
    this.objDiv;
    this.page = 1;
    this.initial = true;
    this.fetching = false;
    this.profile = JSON.parse(localStorage.getItem("profile"));

    this.state = {
      position: null,
      messages: []
    };

    this.handleInterval = this.handleInterval.bind(this);
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(this);

    // this.renderMessages = this.renderMessages.bind(this);
    // this.hasToUpdate = this.hasToUpdate.bind(this);
  }

  componentWillMount() {
    let position;

    if (this.props.position === {} || this.props.position.length === 0) {
      position = JSON.parse(localStorage.getItem("position"));
    } else {
      position = this.props.position;
    }

    this.props.getMessages(position, this.profile.radius, 1);

    const INTERVAL = 1000;
    this.intervalID = setInterval(this.handleInterval, INTERVAL);
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.requestID);
    this.requestID = null;
    this.intervalID = null;
  }

  componentWillReceiveProps(nextProps){
    if (this.page === 1) {
      this.setState({ messages: nextProps.messages });
    } else {
      if (nextProps.messages) {
        this.setState({ messages: [...this.state.messages, ...nextProps.messages]});
      }
    }

    // 5. 서버로부터 새 메시지 이벤트를 받았을 경우에 화면에 새로 렌더링해준다.
    this.props.socket.on('new_msg', (response) => {
      this.setState({messages: [response.result, ...this.state.messages]});
      this.scrollToBottom();
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.initial && this.state.messages !== undefined && this.state.messages !== []) {
      this.objDiv = document.getElementsByClassName("message-list-chat-wrapper")[0];
      this.scrollToBottom();
      this.initial = false;
      this.beforeHeight = this.objDiv.scrollHeight;
      window.$(".message-list-wrapper > div:first-of-type").hide();
    }

    if (!this.fetching && this.state.position !== null && this.state.position <= 0) {
      if (prevProps.messages && config.PAGINATION_COUNT === prevProps.messages.length) {
          this.beforeHeight = this.objDiv.scrollHeight;
          this.page++;
          this.props.getMessages(this.props.position, this.profile.radius, this.page);
          this.fetching = true;
          window.$(".message-list-wrapper > div:first-of-type").show();
      }
    }

    if (this.fetching && this.beforeHeight !== this.objDiv.scrollHeight) {
      const newHeight = this.objDiv.scrollHeight - this.beforeHeight;
      this.objDiv.scrollTop = newHeight;
      this.fetching = false;
      window.$(".message-list-wrapper > div:first-of-type").hide();
    }
  }

  handleInterval() {
    // Interval is only used to throttle animation frame
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
  }

  handleRequestAnimationFrame() {
    const newScrollPosition = this.getWindowScrollTop();

    // Update the state only when scroll position is changed
    if (newScrollPosition !== this.state.position) {
      this.setState({
        position: newScrollPosition,
      });
    }
  }

  getWindowScrollTop() {
    const item = document.getElementsByClassName("message-list-chat-wrapper");
    if (item && item.length > 0) {
      return item[0].scrollTop;
    }
    return null;
  }

  scrollToBottom(){
    if (this.objDiv) {
      this.objDiv.scrollTop = this.objDiv.scrollHeight - this.objDiv.clientHeight;
    }
  }

  renderMessages(){
    let beforeIdx = -1;
    let beforeTime = -1;
    let tempIdx, tempTime;

    const currentUser = this.profile.idx;

    return this.state.messages.slice(0).reverse()
      .map((message) => {
        tempIdx = beforeIdx;
        tempTime = beforeTime;
        beforeIdx = message.user.idx;
        beforeTime = message.created_at.split('T')[0];

        if(currentUser === message.user.idx) {
          return (
            <Message message={message} key={message.idx}
              sender={"me"}
              start={(tempIdx !== beforeIdx) ? true : false }
              dayStart={(tempTime !== beforeTime) ? true : false} />
          )
        } else {
          return (
            <Message message={message} key={message.idx}
              sender={"you"}
              start={(tempIdx !== beforeIdx) ? true : false }
              dayStart={(tempTime !== beforeTime) ? true : false} />
          )
        }
      });
  }

  render() {
    if(this.state.messages === undefined || this.state.messages == []) {
      return (
        <div className='message-list-wrapper'>
          <Loader
             type="Oval"
             color="#8a78b0"
             height="130"
             width="130"
          />
        </div>
      );
    }

    else {
      return (
        <div className="message-list-wrapper">
          <Loader
             type="Oval"
             color="#8a78b0"
             height="130"
             width="130"
          />
          <div className="message-list-chat-wrapper">
            {this.renderMessages()}
          </div>
          <MessageForm/>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (position, radius, page) => {
      dispatch(getMessages(position, radius, page)).then((response) => {
        dispatch(fetchDataSuccess(response.payload.data));
      });
    },
    setGeoPosition: () => {
      dispatch(setGeoPosition());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
