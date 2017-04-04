import    React from 'react';
import cookie   from 'react-cookie';
import IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'ViewOpenUrl',

  getInitialState: function () {
    return {
      resourceUrl: ''
    };
  },

  componentDidMount () {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {
      self.config = config;

      // ask istex api about the requested document
      // ex: https://api.istex.fr/document/openurl?rft_id=info:doi/10.1136/acupmed-2012-010183&noredirect
      let theOpenUrl = self.config.istexApiUrl + '/document/openurl' + self.props.location.search;
      if (self.props.location.search && self.props.location.search.indexOf('&noredirect') === -1) {
        theOpenUrl += '&noredirect';
      }
      // TODO: add sid=istex-view (concatenated to the maybe existing sid)
      fetch(theOpenUrl).then(function (response) {
        return response.json();
      }).then(function (openUrlRes) {
        self.setState({ resourceUrl: openUrlRes.resourceUrl });
      });
      
    });
  },

  render: function () {
    let self = this;

    return (
      <div className="container">
        <IstexApiStatus />

        <h1>Accéder aux documents ISTEX par OpenURL</h1>

        <a style={{display: self.state.resourceUrl ? 'block' : 'none'}} href={self.state.resourceUrl}>Accéder au document PDF</a>
        <p style={{display: self.state.resourceUrl ? 'none' : 'block'}}>Document introuvable dans la plateforme ISTEX</p>

      </div>
    );
  },

});
