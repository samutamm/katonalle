import {Map} from 'immutable';

function request() {
  return {
    type: 'REQUEST'
  };
}

export function receiveToken(session) {
  localStorage.setItem('token', session.token);
  return {
    type: 'RECEIVE_TOKEN',
    session: session
  };
}

function receiveError(message) {
  localStorage.removeItem('token');
  return {
    type: 'RECEIVE_AUTH_ERROR',
    error: message
  };
}

function tokenOK() {
  return {
    type: 'TOKEN_OK'
  };
}

function canFetch(state) {
  const isChecking = state.getIn(['session', 'isChecking']);
  if(!isChecking) {
    return true;
  } else {
    return false;
  }
}

function sendAuthentication(url, username, password) {
  return dispatch => {
    dispatch(request());
    $.ajax({
      url: url,
      dataType: 'json',
      type: "GET",
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      complete: function(reponse) {
        if (reponse.status === 200) {
          dispatch(receiveToken(reponse.responseJSON));
          window.location.replace('#/profile');
        } else {
          dispatch(receiveError('Error while locking in. Please check credentials.'));
        }
      }
    });
  }
}

function sendToken(url, token) {
  return dispatch => {
    dispatch(request());
    $.ajax({
      url: url,
      dataType: 'json',
      type: "GET",
      async: true,
      headers: {
        "Authorization": "Basic " + token
      },
      complete: function(reponse) {
        if (reponse.status === 200) {
          dispatch(tokenOK());
        } else {
          dispatch(receiveError('Error: ' + response.status));
        }
      }
    });
  }
}

export function authenticate(url, username, password) {
  return (dispatch, getState) => {
    if (canFetch(getState().loginReducer)) {
      return dispatch(sendAuthentication(url, username, password))
    } else {
      return Promise.resolve()
    }
  }
}

export function checkToken(url) {
  return (dispatch, getState) => {
    let token = localStorage.getItem('token');
    if (canFetch(getState().loginReducer) && token !== undefined) {
      return dispatch(sendToken(url, token))
    } else {
      return Promise.resolve()
    }
  }
}

export function logOut() {
  localStorage.removeItem('token');
  return {
    type: "LOGOUT"
  };
}
