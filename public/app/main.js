'use strict';
const node_modules = './../../node_modules/';

//var React = require('react');
var createHistory = require(node_modules + 'history/lib/createHashHistory.js').createHistory;

// Use _key instead of _k.
var history = createHistory({
  queryKey: '_key'
});

document.body.appendChild(component());
