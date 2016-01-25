import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Link} from 'react-router';

export const LoginForm = React.createClass({
  render: function() {
    return (
      <form>
        <h3> Log in: </h3>
        <ul>
          <span>Username </span>
          <input />
        </ul>
        <ul>
          <span>Password </span>
          <input />
        </ul>
        <Link to={'/register'}>or register as a client here</Link>
      </form>
    );
  }
});

function mapStateToProps(state) {
  return {
    apartements: state.apartements
  };
}

export const LoginContainer = connect(
  mapStateToProps,
  actionCreators
)(LoginForm);
