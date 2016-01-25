import {List, Map} from 'immutable';

function initial() {
  return Map({
    apartements: Map({
      items: List(),
      filtertext: '',
      filterparam: 'Name',
      isFetching: false
    })
  });
}

function setFetchingTag(state) {
  return state.setIn(['apartements', 'isFetching'], true);
}

function setApartements(state, items) {
  const fetchingFinished = state.setIn(['apartements', 'isFetching'], false);
  return fetchingFinished.setIn(['apartements', 'items'], items);
}

function setFilterText(state, text) {
  return state.setIn(['apartements', 'filtertext'], text);
}

function setFilterParam(state, param) {
  return state.setIn(['apartements', 'filterparam'], param);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST_APARTEMENTS':
    return setFetchingTag(state);
  case 'RECEIVE_APARTEMENTS':
    return setApartements(state, action.items);
  case 'SET_FILTERTEXT':
    return setFilterText(state, action.text);
  case 'SET_FILTERPARAM':
    return setFilterParam(state, action.param);
  }
  return state;
}
