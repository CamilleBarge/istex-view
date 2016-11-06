import    React from 'react';
import ReactDOM from 'react-dom';
import Viewer   from './components/viewer.jsx';
import Home     from './components/home.jsx';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/"  component={Home} />
    <Route path="/*" component={Viewer} />
  </Router>
), document.getElementById('istex-viewer'));