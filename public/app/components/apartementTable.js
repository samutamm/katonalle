import configurations from './Configurations';
import React from 'react';

var ParamButton = React.createClass({
  getInitialState: function() {
    return {clicked: this.props.clicked};
  },
  handleClick: function(event) {
    this.props.handleChangedParam({
      clicked: this.state.clicked,
      id: this.props.paramName
    });
  },
  render: function() {
    var id = this.props.clicked ? 'selectedbutton' : '';
    return (
      <button onClick={this.handleClick}
        id={id}
      >
        {this.props.paramName}
      </button>
    );
  }
});

var FilterParam = React.createClass({
  getInitialState: function() {
    return {param: 'Name'};
  },
  handleChangedParam: function(change) {
    this.setState({param: change.id});
    this.props.paramChanges(
      this.props.filterText,
      change.id
    );
  },
  render: function() {
    var names = ['Name', 'Address'];
    var buttons = [];
    for(var i = 0; i < names.length; i++) {
      var name = names[i];
      var clicked = name === this.state.param;
      buttons.push(<ParamButton
        paramName={name}
        clicked={clicked}
        key={name}
        handleChangedParam={this.handleChangedParam}
      />);
    }
    return (
      <div>
        {buttons}
      </div>
    );
  }
});

var FilterForm = React.createClass({
  handleChange: function() {
      this.props.onUserInput(
        this.refs.filterTextInput.value,
        this.props.filterParam
      );
  },
  render: function() {
    return (
      <div>
        <FilterParam
          filterText={this.props.filterText}
          filterParam={this.props.filterParam}
          paramChanges={this.props.onUserInput} />
        <form>
          <input  type="text"
                  placeholder="Search..."
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange} />
        </form>
      </div>
    );
  }
});

var ApartementRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.apartement.Name}</td>
        <td>{this.props.apartement.Address}</td>
      </tr>
    );
  }
});

var ApartementTable = React.createClass({
  getInitialState: function() {
    return {apartements: []};
  },
  componentDidMount: function() {
    const state = this;
    configurations(function(conf) {
      $.ajax({url: conf.endpoints.apartement,
        success: function(res) {
          state.setState({
            apartements: res
          });
        }
      });
    });
  },
  render: function() {
    var rows = [];
    this.state.apartements.forEach(function(apartement) {
        if(apartement[this.props.filterParam].indexOf(this.props.filterText) === -1) {
            return;
        }
        rows.push(<ApartementRow apartement={apartement} key={apartement.Name} />);
    }.bind(this));
    return (
      <div>
        <p>Filtering {this.props.filterParam}</p>
        <table>
           <thead>
               <tr>
                   <th>Name</th>
               </tr>
           </thead>
           <tbody>{rows}</tbody>
       </table>
     </div>
    );
  }
});

export const FilterableApartementTable = React.createClass({
  getInitialState: function() {
    return {
        filterText: '',
        filterParam: 'Name'
    };
  },
  handleUserInput: function(filterText, filterParam) {
    this.setState({
        filterText: filterText,
        filterParam: filterParam
    });
  },
  render: function() {
    return (
      <div>
        <h1> Vapaita asuntoja </h1>
        <FilterForm
          filterText={this.state.filterText}
          filterParam={this.state.filterParam}
          onUserInput={this.handleUserInput}
        />
        <ApartementTable
          filterText={this.state.filterText}
          filterParam={this.state.filterParam}
          onUserInput={this.handleUserInput}
        />
      </div>
    );
  }
});
