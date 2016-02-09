import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../creators/login_actions';
import {Link} from 'react-router';

export const LoginForm = React.createClass({
  handleLogin: function(e) {
    e.preventDefault();
    this.props.authenticate(
      'http://localhost:3030/login',
      this.refs.username.value,
      this.refs.password.value
    );
  },
  render: function() {
    debugger;
    return (
      <div>
        <form>
          <h3> Log in: </h3>
          <ul>
            <span>Username </span>
            <input type="text"
                   ref="username" />
          </ul>
          <ul>
            <span>Password </span>
            <input type="text"
                   ref="password" />
          </ul>
          <button type="submit"
                  onClick={this.handleLogin}>Log in</button>
          <Link to={'/register'}>or register as a client here</Link>
        </form>
        <p>{this.props.message}</p>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    message: state.loginReducer.getIn(['session', 'message']),
    isChecking: state.loginReducer.getIn(['session', 'isChecking']),
    token: state.loginReducer.getIn(['session', 'token'])
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators
)(LoginForm);
