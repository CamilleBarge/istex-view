import    React from 'react';
import cookie   from 'react-cookie';
import qs       from 'querystring';
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
      if (self.props.location.query.sid) {
        self.props.location.query.sid += ',istex-view'
      } else {
        self.props.location.query.sid = 'istex-view'
      }
      self.props.location.query.noredirect = true;
      let theOpenUrl = self.config.istexApiUrl + '/document/openurl?' + qs.stringify(self.props.location.query);
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

        <h1>Accéder aux ressources ISTEX par OpenURL</h1>

        <a style={{display: self.state.resourceUrl ? 'block' : 'none'}} href={self.state.resourceUrl}>Accéder au document PDF</a>
        <p style={{display: self.state.resourceUrl ? 'none' : 'block'}}>Document introuvable dans la plateforme ISTEX</p>

      </div>
    );
  },

});
