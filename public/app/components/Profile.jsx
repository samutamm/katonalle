import React from 'react';
import Admin from './profile/Admin';
import Client from './profile/Client';
import Worker from './profile/Worker';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome {this.props.username}!</h1>
        {this.props.role === 'ADMIN' ? <Admin /> : null}
        {this.props.role === 'CLIENT' ? <Client /> : null}
        {this.props.role === 'WORKER' ? <Worker /> : null}
      </div>
    );
  }
});
