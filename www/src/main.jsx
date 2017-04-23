import    React    from 'react';
import ReactDOM    from 'react-dom';
import ViewDoc     from './components/view-doc.jsx';
import ViewOpenUrl from './components/view-openurl.jsx';
import Home        from './components/home.jsx';

// import { Router, Route, Link, browserHistory } from 'react-router';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/"         component={Home} />
      <Route path="/openurl*"       component={ViewOpenUrl} />
      <Route path="/([0-9A-Z]{40})" component={ViewDoc} />
    </div>
  </Router>
), document.getElementById('istex-viewer'));