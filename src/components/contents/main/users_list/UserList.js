import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from './../../../../config';
import styles from './styles.css';

function mapStateToProps(state) {
  return {
    users: state.messages.users
  };
}

// const User = (info) => (
//
// );

class UserList extends Component {
  constructor(props) {
    super(props);

    this.profile = JSON.parse(localStorage.getItem("profile"));
  }
  componentDidUpdate() {
  }

  renderUsers() {
    return this.props.users
      .map((user) => {
        if(this.profile.idx !== user.idx) {
          return (
            <div>
            <p>{user.nickname}</p>
            <p>{user.avatar}</p>
            </div>
          )
        }
      });
  }

  render() {
    return (
      <div className="user-list-wrapper">
        <div className="user-list-my-profile">
        <div className="avatar-wrapper">
            <img className="avatar-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jDMS1MncJg6-PdQR5gzpTihd4qkL9ufDNA133zQ3tGaKW02X" />
        </div>
          {this.profile.nickname}
          {this.profile.description}
        </div>
      {this.renderUsers()}
      </div>
    );
  }
};

export default connect(mapStateToProps, null)(UserList);
