import {Map} from 'immutable';
import {appHistory} from './../components/Router.js';

function requestPostApartement() {
  return {
    type: 'REQUEST_APARTEMENTS'
  };
}

function postApartementSuccess() {
  return {
    type: 'POST_APARTEMENT_SUCCESS',
    message: 'New apartement created.'
  };
}

function postApartementError(error) {
  return {
    type: 'POST_APARTEMENT_ERROR',
    error: error
  };
}

function shouldPostApartement(state) {
  const isChecking = state.getIn(['apartement', 'isChecking']);
  if(!isChecking) {
    return true;
  } else {
    return false;
  }
}

function sendApartement(url, body) {
  return dispatch => {
    dispatch(requestPostApartement());
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
          dispatch(postApartementSuccess());
          appHistory.push('apartements/' + JSON.parse(reponse.responseText).id);
        } else {
          dispatch(postApartementError('Error: ' + response.body));
        }
      }
    });
  }
}

export function postApartement(url, body) {
  return (dispatch, getState) => {
    if (shouldPostApartement(getState().apartementReducer)) {
      return dispatch(sendApartement(url, body))
    } else {
      return Promise.resolve()
    }
  }
}
