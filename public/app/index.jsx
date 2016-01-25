import {ApartementsContainer} from './components/FilterableApartementTable';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {fetchApartementsIfNeeded, setFilterparam, setFiltertext} from './action_creators';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(fetchApartementsIfNeeded('http://localhost:3015/api/apartements')).then(
  () => console.log(store.getState())
);
store.dispatch(setFilterparam('Name'));
store.dispatch(setFiltertext(''));

ReactDOM.render(
  <Provider store={store}>
    <ApartementsContainer />
  </Provider>,
  document.getElementById('content')
);
