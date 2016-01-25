import {List, Map} from 'immutable';

function initial() {
  var map = Map()
  map = map.set('apartements', List());
  map = map.set('filtertext', '');
  map = map.set('filterparam', '');
  map = map.set('isFetching', false);
  return map;
}

function setFetchingTag(state) {
  return Object.assign({}, state, {
    isFetching: true
  });
}

function setApartements(state, apartements) {
  return Object.assign({}, state, {
    isFetching: false,
    apartements: apartements
  });
}

function setFilterText(state, filtertext) {
  return Object.assign({}, state, {
    filtertext: filtertext
  });
}

function setFilterParam(state, filterparam) {
  return Object.assign({}, state, {
    filterparam: filterparam
  });
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST_APARTEMENTS':
    return setFetchingTag(state);
  case 'RECEIVE_APARTEMENTS':
    return setApartements(state, action.apartements);
  case 'SET_FILTERTEXT':
    return setFilterText(state, action.filtertext);
  case 'SET_FILTERPARAM':
    return setFilterParam(state, action.filterparam);
  }
  return state;
}
