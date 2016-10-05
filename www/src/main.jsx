import    React from 'react';
import ReactDOM from 'react-dom';
import Viewer   from './components/viewer.jsx';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/*" component={Viewer} />
  </Router>
), document.getElementById('istex-viewer'));