import createHistory from 'history/lib/createHashHistory';

// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});
