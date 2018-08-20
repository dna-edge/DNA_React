import React, { Component, PropTypes } from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import { connect } from 'react-redux';

import { sendMessage }
  from './../../../../actions/messages/GeoMsgAction';

import { Button } from 'reactstrap';
import Message from './Message';

import styles from './styles.css';

const renderInput = (field) => {
  return (
    <div>
      <input {...field.input} type={field.type} className="message-text" autoComplete="off"/>
    </div>
  )
}

class MessageForm extends Component{
  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    this.props.sendMessage(values);
    this.props.reset('newMessage');
  }

  render() {
    const { handleSubmit, submitMyForm } = this.props;

    return(
      <form className="message-write" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="contents" component={renderInput} />

        <Button className="msg-form-button" type="submit">
          <span className="ti-location-arrow"></span>
        </Button>

        <div className="message-vl" />
        <Button className="msg-form-button location-button">
          <span className="ti-location-pin"></span>
        </Button>
        <Button className="msg-form-button image-button">
          <span className="ti-image"></span>
        </Button>
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

MessageForm = connect(null, { sendMessage, reset })(MessageForm);

export default reduxForm({
  form: 'newMessage'
})(MessageForm);
