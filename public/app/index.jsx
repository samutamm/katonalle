import Router from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import {fetchApartementsIfNeeded} from './creators/action_creators';
import {receiveToken} from './creators/login_actions';
import {routes, appHistory} from './components/Router.js';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);
const store = createStoreWithMiddleware(reducer);
let token = localStorage.getItem('token');
store.dispatch(receiveToken({token: token }));

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('content')
);
