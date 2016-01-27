import React from 'react';
import {connect} from 'react-redux';

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
          let redirectAfterLogin = this.props.location.pathname;
          window.location.replace(`#/login`);
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
      isAuthenticated: state.loginReducer.getIn(['session', 'isAuthenticated'])
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
