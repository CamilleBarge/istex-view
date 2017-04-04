import    React from 'react';

module.exports = React.createClass({
  displayName: 'IstexApiStatus',

  getInitialState: function () {
    return {
      // do not show warning as long as the ajax
      // request is not finished
      isAvailable: true
    };
  },

  componentDidMount () {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {

      // call istex-api to check if the server is ready
      fetch(config.istexApiUrl + '/document/?q=*&output=id,ark&sid=istex-view').then(function (response) {
        self.setState({isAvailable: true});
      }).catch(function (err) {
        self.setState({isAvailable: false});
      });


    });

  },

  render: function () {
    let self = this;
    if (!self.state.isAvailable) {
      return (
        <div className="alert alert-danger" role="alert">
          ISTEX API is not listening. Please start it to be able to view ISTEX documents.
        </div>
      );
    } else {
      return null;
    }
  }

});
