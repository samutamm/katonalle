import React from 'react';
import {FormField} from './../../RegisterContainer';
import {connect} from 'react-redux';
import * as actionCreators from './../../../creators/new_apartement_actions';

export const PostApartement = React.createClass({
  register: function(e) {
    e.preventDefault();
    const json = {
      name: this.refs.Name.getText(),
      address: this.refs.Address.getText(),
      city: this.refs.City.getText(),
      agent: this.refs.Agent.getText(),
      price: parseInt(this.refs.Price.getText())
    };
    this.fields().forEach(function(field) {
      const name = field.name.toLowerCase();
      if (json[name] !== undefined && json[name].length < field.length) {
        alert('Field ' + field.name + ' has to be at least ' + field.length + ' long.');
        return;
      }
    });
    this.props.postApartement('http://localhost:3015/api/apartements', json);
  },
  fields: function() {
    return [{name:'Name', length: 4},
            {name:'Address', length: 4},
            {name:'City', length: 3},
            {name:'Agent', length: 0},
            {name:'Price', length: 1}];
  },
  render: function() {
    const rows = [];
    this.fields().forEach(function(f) {
      rows.push(<FormField ref={f.name} field={f} key={f.name} />);
    });
    return (
      <div>
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
    isChecking: state.apartementReducer.getIn(['apartement', 'isChecking'])
  };
}

export const PostApartementContainer = connect(
  mapStateToProps,
  actionCreators
)(PostApartement);
