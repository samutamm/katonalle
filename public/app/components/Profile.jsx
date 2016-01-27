import React from 'react';
import Admin from './profile/Admin';
import Client from './profile/Client';
import Worker from './profile/Worker';

export default React.createClass({
  render: function() {
    return (
      <div>
        <p>Welcome {this.props.username}!</p>
        {this.props.role === 'ADMIN' ? <Admin /> : null}
        {this.props.role === 'CLIENT' ? <Client /> : null}
        {this.props.role === 'WORKER' ? <Worker /> : null}
      </div>
    );
  }
});
