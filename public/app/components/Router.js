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

const configUrl = "http://localhost:3000/configurations";

export const routes = <Route component={App}>
  <Route path="/apartements/new" component={
    requireAuthentication(requireConfigurations(PostApartementContainer))
  } source={configUrl} onlyFor="WORKER" />
  <Route path="/apartements/:index" component={SingleApartement} />
  <Route path="/worker/new" component={
      requireAuthentication(requireConfigurations(RegisterContainer))
    } source={configUrl} onlyFor="ADMIN" register="WORKER" />
  <Route path="/login" component={requireConfigurations(LoginContainer)} source={configUrl} />
  <Route path="/logout" component={LogoutContainer} />
  <Route path="/register" component={
      requireConfigurations(RegisterContainer)
    } source={configUrl} register="CLIENT" />
  <Route path="/profile" component={
      requireAuthentication(requireConfigurations(Profile))
    } source={configUrl} />
  <Route path="/" component={ApartementsContainer} />
</Route>;

export const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
