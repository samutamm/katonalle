import React from 'react';
import {connect} from 'react-redux';

export const Apartement = React.createClass({
  render: function() {
    const apartementIndex = this.props.params.index;
    return (
      <div>
        <h1>SINGLE APARTEMENT</h1>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {

  };
}

export const SingleApartement = connect(mapStateToProps)(Apartement);
