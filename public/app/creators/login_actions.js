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
      dataType: 'json',
      type: "GET",
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      complete: function(reponse) {
        const statusCode = reponse.status;
        if (statusCode === 200) {
          dispatch(receiveToken(reponse.responseJSON.token));
          window.location.replace('#/profile');
        } else {
          dispatch(receiveError('Error while locking in. Please check credentials.'));
        }
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
