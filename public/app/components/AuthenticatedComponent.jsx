import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../creators/login_actions';

export function requireAuthentication(Component) {
  const AuthenticatedComponent = React.createClass({
    componentWillMount: function() {
      this.checkAuth();
    },
    componentWillReceiveProps: function(nextProps) {
      this.checkAuth();
    },
    checkAuth: function() {
      if (!this.props.isAuthenticated) {
        this.props.checkToken(
          "http://localhost:3030/check",
          this.props.route.onlyFor
        );
      }
    },
    render: function() {
      return (
        <div>
            {this.props.isAuthenticated === true
                ? <Component {...this.props}/>
                : null
            }
        </div>
      );
    }
  });

  const mapStateToProps = (state) => ({
      token: state.loginReducer.getIn(['session', 'token']),
      isAuthenticated: state.loginReducer.getIn(['session', 'isAuthenticated']),
      username: state.loginReducer.getIn(['session', 'username']),
      role: state.loginReducer.getIn(['session', 'role'])
  });

  return connect(
    mapStateToProps,
    actionCreators
  )(AuthenticatedComponent);
}
