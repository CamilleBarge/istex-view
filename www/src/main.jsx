import    React    from 'react';
import ReactDOM    from 'react-dom';
import ViewDoc     from './components/view-doc.jsx';
import ViewOpenUrl from './components/view-openurl.jsx';
import Home        from './components/home.jsx';

import { Router, Route, Link, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/"         component={Home} />
    <Route path="/openurl*" component={ViewOpenUrl} />
    <Route path="/*"        component={ViewDoc} />
  </Router>
), document.getElementById('istex-viewer'));