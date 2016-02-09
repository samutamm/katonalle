import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../creators/login_actions';

export function requireConfigurations(Component) {
  const ConfiguredComponent = React.createClass({
    getInitialState: function() {
      return {
       configurations: {},
      };
    },
    componentDidMount: function() {
     this.serverRequest = $.get(this.props.route.source, function (result) {
        this.setState({
          configurations: result,
        });
      }.bind(this));
    },
    render: function() {
      return (
        <div>
          <Component {...this.props}
                      configurations={this.state.configurations}/>
        </div>
      );
    }
  });

  const mapStateToProps = (state) => ({

  });

  return connect(
    mapStateToProps,
    actionCreators
  )(ConfiguredComponent);
}
