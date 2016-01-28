import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../creators/register_actions';
import ReactDOM from 'react-dom';

const FormField = React.createClass({
  fieldChanged: function(e) {
    const chars = e.target.value.length;
    if(chars > 0 && chars < this.props.field.length) {
      e.target.className = "invalid";
    } else {
      e.target.className = "";
    }
  },
  getText: function() {
    return ReactDOM.findDOMNode(this).childNodes[1].childNodes[0].value;
  },
  render: function() {
    const field = this.props.field;
    return (
      <tr>
        <td><span>{field.name}: </span></td>
        <td><input type="text" onChange={this.fieldChanged} ></input></td>
      </tr>
    );
  }
});

export const RegisterForm = React.createClass({
  register: function(e) {
    e.preventDefault();
    const json = {
      name: this.refs.Name.getText(),
      email: this.refs.Email.getText(),
      address: this.refs.Address.getText(),
      username: this.refs.Username.getText(),
      password: this.refs.Password.getText()
    };
    this.fields().forEach(function(field) {
      const name = field.name.toLowerCase();
      if (json[name] !== undefined && json[name].length < field.length) {
        alert('Field ' + field.name + ' has to be at least ' + field.length + ' long.');
        return;
      }
    });
    if (this.refs.Password.getText() !== this.refs.Password_again.getText()) {
      alert('Passwords does not match.');
      return;
    }
    json.role = this.props.route.role;
    this.props.register('http://localhost:3030/api/persons', json);
  },
  fields: function() {
    return [{name:'Name', length: 3},
            {name:'Email', length: 4},
            {name:'Address', length: 3},
            {name:'Username', length: 3},
            {name:'Password', length: 8},
            {name:'Password_again', length: 8}];
  },
  render: function() {
    const rows = [];
    const fields = this.fields();
    fields.forEach(function(f) {
      rows.push(<FormField ref={f.name} field={f} key={f.name} />);
    });
    return (
      <div>
        <h2>Register as a new {this.props.route.role}</h2>
        <table>
          <tbody>{rows}</tbody>
        </table>
        <button type="Submit"
                onClick={this.register}>
                Submit
        </button>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    message: state.loginReducer.getIn(['register', 'message']),
    isChecking: state.loginReducer.getIn(['register', 'isChecking']),
    token: state.loginReducer.getIn(['register', 'token'])
  };
}

export const RegisterContainer = connect(
  mapStateToProps,
  actionCreators
)(RegisterForm);
