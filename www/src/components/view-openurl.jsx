import    React from 'react';
import qs       from 'querystring';
import IstexApiStatus from './istex-api-status.jsx';
import IstexApiDocRecord from './istex-api-doc-record.jsx';

module.exports = React.createClass({
  displayName: 'ViewOpenUrl',

  getInitialState: function () {
    return {
      istexId: null,
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
            resourceUrl: self.mapApiUrlToViewUrl(openUrlRes.resourceUrl).url,
            istexId: self.mapApiUrlToViewUrl(openUrlRes.resourceUrl).istexId,
            loading: false
          });
        } else {
          self.setState({
            loading: false,
          });
          window.location = self.mapApiUrlToViewUrl(openUrlRes.resourceUrl).url;
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

    var docRecord = self.state.istexId ? <IstexApiDocRecord istexId={self.state.istexId} /> : null;

    return (
      <div className="container">
        <IstexApiStatus />

        <div className="alert alert-info iv-loading-openurl" role="alert" style={{display: self.state.loading ? 'block' : 'none'}}>Chargement en cours...</div>
        
        {docRecord}

        <div style={{display: self.state.resourceUrl === null ? 'none' : 'block'}}>
          <a style={{display: self.state.resourceUrl ? 'block' : 'none'}} href={self.state.resourceUrl}>
            <button type="button" className="btn btn-default" className="iv-openurl-fulltext-btn">
              <span className="glyphicon glyphicon-book" aria-hidden="true"></span> Accéder au document
            </button>            
          </a>
          <p style={{display: self.state.resourceUrl ? 'none' : 'block'}}>
            <div className="alert alert-warning" role="alert" >
              <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Document introuvable dans la plateforme ISTEX
            </div>
          </p>
        </div>

      </div>
    );
  },

  mapApiUrlToViewUrl: function (apiUrl) {
    var matches = apiUrl.match(new RegExp('api\.istex\.fr\/document\/([A-Z0-9]{40})\/'));
    if (matches) {
      return { url: '/' + matches[1], istexId: matches[1] };
    } else {
      return { url: '', istexId: '' };
    }
  }

});
