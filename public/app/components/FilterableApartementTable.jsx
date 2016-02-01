import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../creators/action_creators';
import {Map} from 'immutable';
import FilterForm from './FilterForm';

var ApartementRow = React.createClass({
  render: function() {
    return (
      <tr className="ApartementRow" >
        <td>{this.props.apartement.name}</td>
        <td>{this.props.apartement.city}</td>
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
        if(apartement[this.props.filterparam.toLowerCase()].indexOf(this.props.filtertext) === -1) {
            return;
        }
        rows.push(<ApartementRow apartement={apartement} key={apartement.name} />);
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
    apartements: state.apartementReducer.getIn(['apartements', 'items']),
    filtertext: state.apartementReducer.getIn(['apartements', 'filtertext']),
    filterparam: state.apartementReducer.getIn(['apartements', 'filterparam']),
    isFetching: state.apartementReducer.getIn(['apartements', 'isFetching'])
  };
}

export const ApartementsContainer = connect(
  mapStateToProps,
  actionCreators
)(FilterableApartementTable);
