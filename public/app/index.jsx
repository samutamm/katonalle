import {ApartementsContainer} from './components/FilterableApartementTable';
import {LoginContainer} from './components/LoginContainer';
import {LogoutContainer} from './components/LogoutContainer';
import {requireAuthentication} from './components/AuthenticatedComponent';
import {RegisterContainer} from './components/RegisterContainer';
import Profile from './components/Profile';
import Router, {Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import App from './components/App';
import {fetchApartementsIfNeeded, setFilterparam, setFiltertext} from './creators/action_creators';
import createHistory from 'history/lib/createHashHistory';
import {receiveToken} from './creators/login_actions';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(fetchApartementsIfNeeded('http://localhost:3015/api/apartements')).then(
  () => console.log(store.getState())
).then(
  () => {
    let token = localStorage.getItem('token');
    if (token !== null && token.length > 12) {
        store.dispatch(receiveToken({token: token }));
    }
  }
);


const routes = <Route component={App}>
  <Route path="/login" component={LoginContainer} />
  <Route path="/logout" component={LogoutContainer} />
  <Route path="/register" component={RegisterContainer} role="CLIENT" />
  <Route path="/profile" component={requireAuthentication(Profile)} />
  <Route path="/" component={ApartementsContainer} />
</Route>;

var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('content')
);
