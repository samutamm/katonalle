import fetch from 'isomorphic-fetch';

function shouldFetchApartements(state) {
  const apartements = state.apartements;
  if(!apartements) {
    return true;
  } else if(state.isFetching) {
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

function receiveApartements(apartements) {
  return {
    type: 'RECEIVE_APARTEMENTS',
    apartements: apartements,
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
    filtertext: text
  };
}

export function setFilterparam(param) {
  return {
    type: 'SET_FILTERPARAM',
    filterparam: param
  };
}
