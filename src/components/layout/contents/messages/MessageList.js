import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import { getMessages } from './../../../../actions/messages/GeoMsgAction';
import { fetchDataSuccess, fetchDataFailure } from './../../../../actions/index';

import Message from './Message';
import MessageForm from './MessageForm';

import styles from './styles.css';
import config from './../../../../config';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.before;
    this.objDiv;
    this.page = 1;
    this.initial = true;
    this.fetching = false;

    this.state = {
      position: null,
      messages: []
    };

    this.handleInterval = this.handleInterval.bind(this);
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(this);

    // this.renderMessages = this.renderMessages.bind(this);
    // this.hasToUpdate = this.hasToUpdate.bind(this);
  }

  componentWillMount(){
    if (localStorage.getItem('coord')) {
      this.props.getMessages(1);
    }
    // 5. 서버로부터 새 메시지 이벤트를 받았을 경우에 화면에 새로 렌더링해준다.
    this.props.socket.on('new_msg', (response) => {
      this.setState({messages: [response.result, ...this.state.messages]});
      this.scrollToBottom();
    });

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

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps){
    if (this.page === 1) {
      this.setState({ messages: nextProps.messages });
    } else {
      if (nextProps.messages) {
        this.setState({ messages: [...this.state.messages, ...nextProps.messages]});
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.initial && this.state.messages !== undefined && this.state.messages !== []) {
      this.objDiv = document.getElementsByClassName("message-list-chat-wrapper")[0];
      this.scrollToBottom();
      this.initial = false;
      this.beforeHeight = this.objDiv.scrollHeight;
      window.$(".message-list-right-wrapper > div:first-of-type").hide();
    }

    if (!this.fetching && this.state.position !== null && this.state.position <= 0) {
      if (prevProps.messages && config.PAGINATION_COUNT === prevProps.messages.length) {
          this.beforeHeight = this.objDiv.scrollHeight;
          this.page++;
          this.props.getMessages(this.page);
          this.fetching = true;
          window.$(".message-list-right-wrapper > div:first-of-type").show();
      }
    }

    if (this.fetching && this.beforeHeight !== this.objDiv.scrollHeight) {
      const newHeight = this.objDiv.scrollHeight - this.beforeHeight;
      this.objDiv.scrollTop = newHeight;
      this.fetching = false;
      window.$(".message-list-right-wrapper > div:first-of-type").hide();
    }
  }

  getWindowScrollTop() {
    return document.getElementsByClassName("message-list-chat-wrapper")[0].scrollTop;
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

  scrollToBottom(){
    if (this.objDiv) {
      this.objDiv.scrollTop = this.objDiv.scrollHeight - this.objDiv.clientHeight;
    }
  }

  renderMessages(){
    let beforeIdx = -1;
    let beforeTime = -1;
    let tempIdx, tempTime;

    const currentUser = JSON.parse(localStorage.getItem('profile')).idx;

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
        <div className='message-list-right-wrapper'>
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
        <div className="message-list-right-wrapper">
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

function mapStateToProps(state){
  return {
    socket: state.app.socket,
    messages: state.messages.messages
    // newMessage: state.app.newMessage,
    // newMessageCount: state.app.newMessageCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (page) => {
      dispatch(getMessages(page)).then((response) => {
        dispatch(fetchDataSuccess(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
