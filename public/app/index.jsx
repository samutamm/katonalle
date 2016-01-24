import {ApartementsContainer} from './components/apartementTable';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);
const store = createStoreWithMiddleware(reducer);


ReactDOM.render(
  <Provider store={store}>
    <ApartementsContainer />
  </Provider>,
  document.getElementById('content')
);
