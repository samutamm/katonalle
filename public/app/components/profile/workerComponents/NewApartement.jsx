import React from 'react';
import {FormField} from './../../RegisterContainer';

export default React.createClass({
  register: function(e) {
    e.preventDefault();
    const json = {
      name: this.refs.Name.getText(),
      address: this.refs.Address.getText(),
      city: this.refs.City.getText(),
      agent: this.refs.Agent.getText(),
      price: this.refs.Price.getText()
    };
    this.fields().forEach(function(field) {
      const name = field.name.toLowerCase();
      if (json[name] !== undefined && json[name].length < field.length) {
        alert('Field ' + field.name + ' has to be at least ' + field.length + ' long.');
        return;
      }
    });
    alert('Send: ' + json);
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
