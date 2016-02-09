import React from 'react';
import {Route} from 'react-router';
import Profile from './Profile';
import {ApartementsContainer} from './FilterableApartementTable';
import {LoginContainer} from './LoginContainer';
import {LogoutContainer} from './LogoutContainer';
import {requireAuthentication} from './AuthenticatedComponent';
import {requireConfigurations} from './RequestingComponent';
import {RegisterContainer} from './RegisterContainer';
import {SingleApartement} from './SingleApartement';
import {PostApartementContainer} from './profile/workerComponents/PostApartement';
import App from './App';
import { browserHistory, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history';

export const routes = <Route component={App}>
  <Route path="/apartements/new" component={requireAuthentication(PostApartementContainer)} onlyFor="WORKER" />
  <Route path="/apartements/:index" component={SingleApartement} />
  <Route path="/worker/new" component={requireAuthentication(RegisterContainer)} onlyFor="ADMIN" register="WORKER" />
  <Route path="/login" component={requireConfigurations(LoginContainer)} source="http://localhost:3000/configurations" />
  <Route path="/logout" component={LogoutContainer} />
  <Route path="/register" component={RegisterContainer} register="CLIENT" />
  <Route path="/profile" component={requireAuthentication(Profile)} />
  <Route path="/" component={ApartementsContainer} />
</Route>;

export const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
