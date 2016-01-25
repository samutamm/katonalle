import React from 'react/addons';
import ReactDOM from 'react-dom';
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {FilterableApartementTable} from '../../../public/app/components/FilterableApartementTable.jsx';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass}
  = React.addons.TestUtils;

describe('FilterableApartementTable', () => {

  it('shows apartements', () => {
    const apartements =  [
      {
        Name: 'Lupsakka luukku',
        Address: 'Lakkila'
      },
      {
        Name: 'La maison trés élegant',
        Address: 'Lyon'
      }
    ];
    const component = renderIntoDocument(
      <FilterableApartementTable
        filtertext=''
        filterparam='Name'
        apartements={apartements} />
    );
    var apartementRows = scryRenderedDOMComponentsWithClass(component, 'ApartementRow');
    expect(apartementRows.length).to.equal(2);
    expect(apartementRows[0].textContent).to.contains(apartements[0].Name);
  });

  it('should show when fetching', () => {
    const apartements = [];
    const isFetching = true;
    const component = renderIntoDocument(
      <FilterableApartementTable
        filtertext=''
        filterparam='Name'
        apartements={apartements}
        isFetching={isFetching} />
    );
    var fetching = scryRenderedDOMComponentsWithClass(component, 'fetching');
    expect(fetching[0].textContent).to.equal('Fetching');
  });
});
