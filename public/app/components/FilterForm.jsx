import React from 'react';

var ParamButton = React.createClass({
  render: function() {
    var clicked = this.props.paramname === this.props.filterparam;
    var id = clicked ? 'selectedbutton' : '';
    return (
      <button onClick={() => this.props.setFilterparam(this.props.paramname)}
        id={id}
      >
        {this.props.paramname}
      </button>
    );
  }
});

var FilterParam = React.createClass({
  render: function() {
    var names = ['Name', 'City'];
    var buttons = [];
    for(var i = 0; i < names.length; i++) {
      var name = names[i];
      buttons.push(<ParamButton
        paramname={name}
        key={name}
        setFilterparam={this.props.setFilterparam}
        filterparam={this.props.filterparam}
      />);
    }
    return (
      <div>
        {buttons}
      </div>
    );
  }
});

export default React.createClass({
  handleChange: function() {
    this.props.setFiltertext(this.refs.filterTextInput.value);
  },
  render: function() {
    return (
      <div>
        <FilterParam
          {...this.props} />
        <form>
          <input  type="text"
                  placeholder="Search..."
                  value={this.props.filtertext}
                  ref="filterTextInput"
                  onChange={this.handleChange} />
        </form>
      </div>
    );
  }
});
