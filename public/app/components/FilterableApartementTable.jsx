import configurations from './Configurations';
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Map} from 'immutable';
import FilterForm from './FilterForm';

var ApartementRow = React.createClass({
  render: function() {
    return (
      <tr className="ApartementRow" >
        <td>{this.props.apartement.Name}</td>
        <td>{this.props.apartement.Address}</td>
      </tr>
    );
  }
});

var ApartementTable = React.createClass({
  render: function() {
    if(this.props.isFetching) {
      return (
        <div className='fetching'>
          <p>Fetching</p>
        </div>
      );
    }
    var rows = [];
    this.props.apartements.forEach(function(apartement) {
        if(apartement[this.props.filterparam].indexOf(this.props.filtertext) === -1) {
            return;
        }
        rows.push(<ApartementRow apartement={apartement} key={apartement.Name} />);
    }.bind(this));
    return (
      <div>
        <p>Filtering {this.props.filterparam}</p>
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
  render: function() {
    return (
      <div>
        <h1> Vapaita asuntoja </h1>
        <FilterForm
          {...this.props}
        />
        <ApartementTable
          {...this.props}
        />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    apartements: state.apartements,
    filtertext: state.filtertext,
    filterparam: state.filterparam,
    isFetching: state.isFetching
  };
}

export const ApartementsContainer = connect(
  mapStateToProps,
  actionCreators
)(FilterableApartementTable);
