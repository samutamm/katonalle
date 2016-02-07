import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h3>Admin portal</h3>
        <Link to="/worker/new" >Register new worker</Link>
      </div>
    );
  }
});
