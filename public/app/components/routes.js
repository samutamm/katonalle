const Router = window.ReactRouter.Router;
const Link = window.ReactRouter.Link;
const Route = window.ReactRouter.Route;

import createHistory from 'history/lib/createHashHistory';

// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});

const About = React.createClass({
  render: function() {
    let { userID } = this.props.params;
    console.log(userID);
    return (
      <div>
        <h1>ABOUT</h1>
      </div>
    );
  }
});
const Inbox = React.createClass({
  render: function() {
    return (
      <div>
        <h1>INBOX</h1>
      </div>
    );
  }
});

// Then we delete a bunch of code from App and
// add some <Link> elements...
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
), document.getElementById('content'));
