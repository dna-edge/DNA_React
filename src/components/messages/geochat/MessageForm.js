import React, { Component, PropTypes } from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import { connect } from 'react-redux';
import { sendMessage, makeUpdate }
  from './../../../actions/messages/GeoMsgAction';
import Message from './Message';

import styles from './../styles.css';

const renderInput = (field) => {
  return (
    <div>
      <input {...field.input} type={field.type} className="message-text" />
    </div>
  )
}

class MessageForm extends Component{
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.reRender) {
      this.props.reset('newMessage');
    }
  }

  onSubmit(values) {
    this.props.sendMessage(values, this.props.conversationIdx);
    this.props.hasToUpdate();
    this.props.makeUpdate();
    this.props.reset('newMessage');
  }

  render() {
    const { handleSubmit, submitMyForm } = this.props;

    return(
      <form className="message-write" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="contents" component={renderInput} />

        <button type="submit"><span className="ion-ios-paperplane-outline"></span></button>
      </form>
    )
  }
}

function validate(values){
  const errors = {};

  if(!values.contents){
    errors.contents = "Enter a contents";
  }

  return errors;
}

MessageForm = connect(null, { sendMessage, makeUpdate, reset })(MessageForm);

export default reduxForm({
  form: 'newMessage'
})(MessageForm);
