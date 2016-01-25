import fetch from 'isomorphic-fetch';
import {Map} from 'immutable';

function shouldFetchApartements(state) {
  const apartements = state.get('apartements');
  if(!apartements.items) {
    return true;
  } else if(apartements.isFetching) {
    return false;
  } else {
    return state.didInvalidate;
  }
}

function requestApartements() {
  return {
    type: 'REQUEST_APARTEMENTS'
  };
}

function receiveApartements(json) {
  return {
    type: 'RECEIVE_APARTEMENTS',
    items: json,
    receivedAt: Date.now()
  };
}

function fetchApartements(api) {
  return dispatch => {
    dispatch(requestApartements(api))
    return fetch(api)
      .then(response => response.json())
      .then(json => dispatch(receiveApartements(json)))
  }
}

export function fetchApartementsIfNeeded(api) {
  return (dispatch, getState) => {
    if (shouldFetchApartements(getState())) {
      return dispatch(fetchApartements(api))
    } else {
      return Promise.resolve()
    }
  }
}

export function setFiltertext(text) {
  return {
    type: 'SET_FILTERTEXT',
    text: text
  };
}

export function setFilterparam(param) {
  return {
    type: 'SET_FILTERPARAM',
    param: param
  };
}
