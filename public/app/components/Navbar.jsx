import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

export const Navbar = React.createClass({

  render: function() {
    return (
      <div >
        <ul>
          <li><Link to="/" >Katon Alle</Link></li>
          <li>{
                this.props.isAuthenticated ?
                <Link to="/logout" >Logout</Link>
                : <Link to="/login" >Login</Link>
              }
          </li>
          <li><Link to="/register" >Register</Link></li>
        </ul>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.loginReducer.getIn(['session', 'isAuthenticated'])
});

export const NavbarContainer = connect(
  mapStateToProps
)(Navbar);
