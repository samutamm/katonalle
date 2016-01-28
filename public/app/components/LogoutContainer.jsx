import React from 'react';
import TimerMixin from 'react-timer-mixin';
import * as actionCreators from '../creators/login_actions';
import {connect} from 'react-redux';

export const LogOut = React.createClass({
  mixins: [TimerMixin],
  componentDidMount: function() {
    this.setTimeout(
      () => { this.props.logoutAndRedirect(); },
      1000
    );
  },
  render: function() {
    return (
      <div>
        <h2>You are being logged out.</h2>
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

export const LogoutContainer = connect(
  mapStateToProps,
  actionCreators
)(LogOut);
