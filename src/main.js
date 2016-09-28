/**
 * @jsx React.DOM
 */
var React = require('react'),
    viewer = require('./components/viewer.jsx');

// Here we put our React instance to the global scope. Make sure you do not put it 
// into production and make sure that you close and open your console if the 
// DEV-TOOLS does not display
window.React = React; 

var App = viewer;

React.render(<App />, document.getElementById('istex-viewer'));
