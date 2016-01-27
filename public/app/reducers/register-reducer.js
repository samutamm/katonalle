import {List, Map, fromJS} from 'immutable';

function initial() {
  return Map({
    register: Map({
      message: '',
      error: '',
      isChecking: false
    })
  });
}

function setFetchingFlag(state) {
  return state.setIn(['register', 'isChecking'], true);
}

function setMessage(state, message) {
  const messageAdded = state.setIn(['register', 'message'], message);
  return messageAdded.setIn(['register', 'isChecking'], false);
}

function setError(state, error) {
  const newState = state.setIn(['register', 'error'], error);
  return newState.setIn(['register', 'isChecking'], false);
}

export default function(state = initial(), action) {
  switch (action.type) {
  case 'REQUEST_REGISTER':
    return setFetchingFlag(state);
  case 'REGISTER_SUCCESS':
    return setMessage(state, action.session);
  case 'REGISTER_ERROR':
    return setError(state, action.error);
  }
  return state;
}
