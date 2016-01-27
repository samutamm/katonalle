import {List, Map, fromJS} from 'immutable';

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

function setToken(state, session) {
  const sessionAdded = state.set('session', fromJS(session));
  const authenticated = sessionAdded.setIn(['session', 'isAuthenticated'], true);
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
    return setToken(state, action.session);
  case 'RECEIVE_AUTH_ERROR':
    return setError(state, action.error);
  }
  return state;
}
