import {List, Map} from 'immutable';

function initial() {
  var map = Map()
  map = map.set('apartements', List());
  map = map.set('filtertext', '');
  map = map.set('filterparam', '');
  return map;
}

function setFetchingTag(state) {
  return state.set('isFetching', true);
}

function setApartements(state, apartements) {
  var newState = state.set('isFetching', false);
  return newState.set('apartements', apartements);
}

function setFilterText(state, filtertext) {
  return state.set('filtertext', filtertext);
}

function setFilterParam(state, filterparam) {
  return state.set('filterparam', filterparam);
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
