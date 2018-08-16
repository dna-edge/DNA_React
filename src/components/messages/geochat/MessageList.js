import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMessages } from './../../../actions/messages/GeoMsgAction';
import Message from './Message';
import MessageForm from './MessageForm';

import styles from './../styles.css';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      formRender: false
    };

    // this.renderMessages = this.renderMessages.bind(this);
    // this.hasToUpdate = this.hasToUpdate.bind(this);
  }

  componentWillMount(){
    this.props.getMessages();
    // this.props.getNewMessageCount();
  }

  componentWillUpdate(nextProps, nextState){
    // if (this.props.newMessage !== nextProps.newMessage ||
    //   this.props.conversationIdx !== nextProps.conversationIdx) {
    //   this.props.getMessages(nextProps.conversationIdx);
    //   this.props.getNewMessageCount();
    //
    //   this.setState({
    //     formRender: true
    //   });
    // }
  }

  componentDidUpdate(){
    this.scrollToBottom();

    if (this.state.formRender) {
      this.setState({
        formRender: false
      });
    }
  }

  hasToUpdate(){
    // this.props.getMessages(this.props.conversationIdx);
  }

  scrollToBottom(){
    var objDiv = document.getElementsByClassName("message-list-chat-wrapper")[0];
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  renderMessages(){
    return this.props.messages
      // .slice(0, 15 * this.state.page - 1)
      .map((message) => {
        console.log(message.contents);
        if(this.state.userIdx === message.sender_idx) {
          return (
            <Message message={message} key={message.idx} sender={"me"} />
          )
        } else if(this.state.userIdx === message.receiver_idx) {
          return (
            <Message message={message} key={message.idx} sender={"you"} />
          )
        }
      });
  }

  render() {
    if(this.props.messages === undefined) {
      return (
        <div className="dashboard-loader">
          <p>메시지를 로딩하고 있습니다.</p>
        </div>
      );
    }

    else {
      return (
        <div className="message-list-right-wrapper">
          <div className="message-list-chat-wrapper">
              {this.renderMessages()}
          </div>
          <MessageForm
            reRender={this.state.formRender}
            conversationIdx={this.props.conversationIdx}
            hasToUpdate={this.hasToUpdate}/>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    messages: state.messages.messages
    // newMessage: state.app.newMessage,
    // newMessageCount: state.app.newMessageCount
  }
}

export default connect(mapStateToProps, { getMessages })(MessageList);
