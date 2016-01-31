import React from 'react';
import {Route} from 'react-router';
import Profile from './Profile';
import {ApartementsContainer} from './FilterableApartementTable';
import {LoginContainer} from './LoginContainer';
import {LogoutContainer} from './LogoutContainer';
import {requireAuthentication} from './AuthenticatedComponent';
import {RegisterContainer} from './RegisterContainer';
import {SingleApartement} from './SingleApartement';
import App from './App';
import { browserHistory, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history';

export const routes = <Route component={App}>
  <Route path="/apartements/:index" component={SingleApartement} />
  <Route path="/login" component={LoginContainer} />
  <Route path="/logout" component={LogoutContainer} />
  <Route path="/register" component={RegisterContainer} role="CLIENT" />
  <Route path="/profile" component={requireAuthentication(Profile)} />
  <Route path="/" component={ApartementsContainer} />
</Route>;

export const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
