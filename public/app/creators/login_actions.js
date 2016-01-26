import {Map} from 'immutable';

function requestLogin() {
  return {
    type: 'REQUEST_LOGIN'
  };
}

function receiveToken(token) {
  return {
    type: 'RECEIVE_TOKEN',
    token: token
  };
}

function receiveError(message) {
  return {
    type: 'RECEIVE_AUTH_ERROR',
    error: message
  };
}

function shouldAuthenticate(state) {
  const isChecking = state.getIn(['session', 'isChecking']);
  if(!isChecking) {
    return true;
  } else {
    return false;
  }
}

function sendAuthentication(url, username, password) {
  return dispatch => {
    dispatch(requestLogin());
    $.ajax({
      url: url,
      username: username,
      password: password,
      type: "GET",
      async: true,
      success: function(text) {
        dispatch(receiveToken(text));
      },
      error: function (text) {
        dispatch(receiveError(text));
      },
      complete: function(text) {
        dispatch(receiveError(text));
      }
    });
  }
}

export function authenticate(url, username, password) {
  return (dispatch, getState) => {
    if (shouldAuthenticate(getState().loginReducer)) {
      return dispatch(sendAuthentication(url, username, password))
    } else {
      return Promise.resolve()
    }
  }
}
