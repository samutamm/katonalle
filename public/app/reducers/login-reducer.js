import {List, Map} from 'immutable';

function initial() {
  return Map({
    session: Map({
      message: '',
      isAuthenticated: false,
      isChecking: false
    })
  });
}

function setFetchingFlag(state) {
  return state.setIn(['session', 'isChecking'], true);
}

function setToken(state, token) {
  const tokenAdded = state.setIn(['session', 'token'], token);
  const authenticated = tokenAdded.setIn(['session', 'isAuthenticated'], true);
  return authenticated.setIn(['session', 'isChecking'], false);
}

function setError(state, message) {
  const newState = state.setIn(['session', 'message'], message);
  return newState.setIn(['session', 'isChecking'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST_LOGIN':
    return setFetchingFlag(state);
  case 'RECEIVE_TOKEN':
    return setToken(state, action.token);
  case 'RECEIVE_AUTH_ERROR':
    return setError(state, action.error);
  }
  return state;
}
