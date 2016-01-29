import React from 'react';
import {NavbarContainer} from './Navbar';

export default React.createClass({
  render: function() {
    return (
      <div>
        <NavbarContainer />
        {this.props.children}
      </div>
    );
  }
});
