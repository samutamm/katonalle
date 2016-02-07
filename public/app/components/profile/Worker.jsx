import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h3>Worker portal</h3>
        <Link to="/apartements/new" >Register new apartement</Link>
      </div>
    );
  }
});
