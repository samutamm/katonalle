import {Map} from 'immutable';

function requestRegister() {
  return {
    type: 'REQUEST_REGISTER'
  };
}

function registerSuccess() {
  return {
    type: 'REGISTER_SUCCESS',
    message: 'You can now log in.'
  };
}

function registerError(error) {
  return {
    type: 'REGISTER_ERROR',
    error: message
  };
}

function shouldRegister(state) {
  const isChecking = state.getIn(['register', 'isChecking']);
  if(!isChecking) {
    return true;
  } else {
    return false;
  }
}

function sendRegistration(url, body) {
  return dispatch => {
    dispatch(requestRegister());
    $.ajax({
      url: url,
      type: "POST",
      async: true,
      data: JSON.stringify(body),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      complete: function(reponse) {
        const statusCode = reponse.status;
        if (statusCode === 200) {
          dispatch(registerSuccess());
          window.location.replace('#/login');
        } else {
          dispatch(registerError('Error: ' + response.body));
        }
      }
    });
  }
}

export function register(url, body) {
  return (dispatch, getState) => {
    if (shouldRegister(getState().loginReducer)) {
      return dispatch(sendRegistration(url, body))
    } else {
      return Promise.resolve()
    }
  }
}
