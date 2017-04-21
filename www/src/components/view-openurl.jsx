import    React from 'react';
import cookie   from 'react-cookie';
import qs       from 'querystring';
import IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'ViewOpenUrl',

  getInitialState: function () {
    return {
      resourceUrl: null,
      loading: true
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
      let theOpenUrl = self.config.istexApiUrl + '/document/openurl?' + qs.stringify(Object.assign({}, self.props.location.query, { noredirect: true }));
      fetch(theOpenUrl).then(function (response) {
        return response.json();
      }).then(function (openUrlRes) {
        if (self.props.location.query.noredirect !== undefined) {
          self.setState({
            resourceUrl: self.mapApiUrlToViewUrl(openUrlRes.resourceUrl),
            loading: false
          });
        } else {
          self.setState({
            loading: false,
          });
          window.location = self.mapApiUrlToViewUrl(openUrlRes.resourceUrl);
        }
      }).catch(function (err) {
          self.setState({
            loading: false,
            resourceUrl: ''
          });
      });
      
    });
  },

  render: function () {
    let self = this;

    return (
      <div className="container">
        <IstexApiStatus />

        <div className="alert alert-info iv-loading-openurl" role="alert" style={{display: self.state.loading ? 'block' : 'none'}}>Chargement en cours...</div>

        <div style={{display: self.state.resourceUrl === null ? 'none' : 'block'}}>
          <h1>Accéder aux ressources ISTEX par OpenURL</h1>

          <a style={{display: self.state.resourceUrl ? 'block' : 'none'}} href={self.state.resourceUrl}>
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-book" aria-hidden="true"></span> Accéder au document
            </button>            
          </a>
          <p style={{display: self.state.resourceUrl ? 'none' : 'block'}}>
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Document introuvable dans la plateforme ISTEX
            </button>            
          </p>
        </div>

      </div>
    );
  },

  mapApiUrlToViewUrl: function (apiUrl) {
    var matches = apiUrl.match(new RegExp('api\.istex\.fr\/document\/([A-Z0-9]{40})\/'));
    if (matches) {
      return '/' + matches[1];
    } else {
      return '';
    }
  }

});
