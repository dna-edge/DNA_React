import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from './../../../../actions/users/UserAction';

import styles from './styles.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    navigate: false
  }

  onSubmit(props){
    this.props.registerUser(props)
      .then(() => {
        this.setState({ navigate: true })
      });
  }

  render() {
    const { handleSubmit } = this.props;
    const { navigate } = this.state;

    if (navigate) {
      return (
        <BrowserRouter>
          <Redirect to="/login" push={ true } />
        </BrowserRouter>
      )
    }

    return (
      <Form className='form-wrapper' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1 className='form-title'>Welcome to DNA!</h1>
        <hr />
        <div className='form-tab'>
          <p className='form-p form-p-red'>필수 입력 사항</p>
          <FormGroup>
            <Label for="exampleEmail">ID</Label>
            <Field component="input" className='form-control' type="text" name="id" id="id" placeholder="아이디를 입력해주세요." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Field component="input" className='form-control' type="email" name="email" id="email" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Field component="input" className='form-control' type="password" name="password" id="password" placeholder="비밀번호를 입력해주세요." />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Field component="input" className='form-control' type="password" name="confirm_password" id="confirm_password" placeholder="비밀번호를 확인해주세요." />
          </FormGroup>
        </div>
        <div className='form-tab'>
          <p className='form-p'>(선택 입력 사항)</p>
          <FormGroup>
            <Label for="exampleEmail">Nickname</Label>
            <Field component="input" className='form-control' type="text" name="nickname" id="nickname" placeholder="별명을 알려주세요." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Introduce</Label>
            <Field component="textarea" className='form-control' type="textarea" name="text" id="description" placeholder="자신을 간단하게 소개해주세요." />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Avatar</Label>
            <Field component="input" className='form-control' type="file" name="avatar" id="avatar" />
            <FormText color="muted">
              프로필 사진을 선택해주세요.
            </FormText>
          </FormGroup>
        </div>
        <Button type='submit' className='form-button'>SIGN UP</Button>
      </Form>
    );
  };
};

RegisterForm = connect(null, { registerUser })(RegisterForm);

export default reduxForm({
  form: 'register'
})(RegisterForm);
