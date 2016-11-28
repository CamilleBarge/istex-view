import    React from 'react';
import config   from '../config.js';

module.exports = React.createClass({
  displayName: 'IstexArkStatus',

  getInitialState: function () {
    return {
      // do not show warning as long as the ajax
      // request is not finished
      isAvailable: true
    };
  },

  componentDidMount () {
    let self = this;

    // call istex-ark to check if the server is ready
    fetch(config.istexArkUrl + '/index.json').then(function (response) {
      self.setState({isAvailable: true});
    }).catch(function (err) {
      self.setState({isAvailable: false});
    });
  },

  render: function () {
    let self = this;
    if (!self.state.isAvailable) {
      return (
        <div className="alert alert-danger" role="alert">
          Istex-ARK server is not listening. Please start it to be able to view ISTEX documents.
        </div>
      );
    } else {
      return null;
    }
  }

});
