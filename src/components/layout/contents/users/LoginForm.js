import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from './../../../../actions/users/UserAction';

import styles from './styles.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: false
  }

  onSubmit(props){
    this.props.login(props)
      .then(() => {
        this.setState({ navigate: true })
      });
  }

  render() {
    const { handleSubmit } = this.props;
    const { navigate } = this.state;

    if (navigate) {
      this.state.navigate = false;
      return (
        <BrowserRouter>
          <Redirect to="/" push={ true } />
        </BrowserRouter>
      )
    }

    return (
      <Form className='form-wrapper' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1 className='form-title'>Welcome to DNA!</h1>
        <hr />
        <div className='login-form-tab'>
          <FormGroup>
            <Label for="exampleEmail">ID</Label>
            <Field component="input" className='form-control' type="text" name="id" id="id" placeholder="아이디를 입력해주세요." />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Field component="input" className='form-control' type="password" name="password" id="password" placeholder="비밀번호를 입력해주세요." />
          </FormGroup>
          <Button type='submit' className='form-button'>LOG IN</Button>
        </div>
      </Form>
    );
  };
};

LoginForm = connect(null, { login })(LoginForm);

export default reduxForm({
  form: 'login'
})(LoginForm);
