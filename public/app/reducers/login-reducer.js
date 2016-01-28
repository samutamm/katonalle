import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    session: Map({
      message: '',
      isAuthenticated: false,
      isChecking: false,
      token: null
    })
  });
}

function setFetchingFlag(state) {
  return state.setIn(['session', 'isChecking'], true);
}

function setAuthenticated(state) {
  const authenticated = state.setIn(['session', 'isAuthenticated'], true);
  return authenticated.setIn(['session', 'isChecking'], false);
}

function setToken(state, session) {
  return setAuthenticated(state.set('session', fromJS(session)));
}

function setError(state, message) {
  const newState = state.setIn(['session', 'message'], message);
  const notAuthenticated = newState.setIn(['session', 'isAuthenticated'], false);
  return notAuthenticated.setIn(['session', 'isChecking'], false);
}

function logOut(state) {
  const noToken = state.setIn(['session', 'token'], null);
  return noToken.setIn(['session', 'isAuthenticated'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST':
    return setFetchingFlag(state);
  case 'RECEIVE_TOKEN':
    return setToken(state, action.session);
  case 'RECEIVE_AUTH_ERROR':
    return setError(state, action.error);
  case 'TOKEN_OK':
    return setAuthenticated(state);
  case 'LOGOUT':
    return logOut(state);
  }
  return state;
}
