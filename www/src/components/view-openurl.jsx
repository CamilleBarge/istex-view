import    React from 'react';
import cookie   from 'react-cookie';
import IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'ViewOpenUrl',

  getInitialState: function () {
    return {
    };
  },

  componentDidMount () {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {
      self.config = config;

      
      // TODO do the openurl stuff
      console.debug(self.props.params);

    });
  },

  render: function () {
    let self = this;

    return (
      <div className="container">
        <IstexApiStatus />

        <p>OpenURL stuff !</p>
      </div>
    );
  },

});
