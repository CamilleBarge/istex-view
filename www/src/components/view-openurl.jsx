import    React from 'react';
import qs       from 'querystring';
import Footer from './footer.jsx';
import IstexApiDocRecord from './istex-api-doc-record.jsx';

class ViewOpenUrl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      istexId: null,
      resourceUrl: null,
      loading: true,

      errorCode: null,
      errorMsg: '',
    };
  }

  // ask istex api about the requested document
  // ex: https://api.istex.fr/document/openurl?rft_id=info:doi/10.1136/acupmed-2012-010183&noredirect
  requestDocumentFromOpenUrlIstexApi(locationObj) {
    let self = this;

    if (!self.props.config.istexApiUrl) return;
    
    locationObj.query = qs.parse(locationObj.search.slice(1));
    if (locationObj.query.sid) {
      locationObj.query.sid += ',istex-view'
    } else {
      locationObj.query.sid = 'istex-view'
    }
    let theOpenUrl = self.props.config.istexApiUrl + '/document/openurl?' + qs.stringify(Object.assign({}, locationObj.query, { noredirect: true }));
    fetch(theOpenUrl).then(function (response) {
      return response.json();
    }).then(function (openUrlRes) {
      // error handling
      if (openUrlRes && openUrlRes.code == 500) {
        self.setState({
          errorCode: openUrlRes.code,
          errorMsg: openUrlRes._message,
          loading: false,
        });
        return;
      }

      // that's ok: something to show
      if (locationObj.query.noredirect !== undefined) {
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
        console.debug(err)
        self.setState({
          loading: false,
          errorCode: 0,
          errorMsg: '' + err,
        });
    });
  }

  componentDidMount() {
    let self = this;

    self.requestDocumentFromOpenUrlIstexApi(self.props.location);
  }

  render() {
    let self = this;

    var docRecord = self.state.istexId ? <IstexApiDocRecord config={self.props.config} istexId={self.state.istexId} /> : null;

    return (
<div>
  <div className="container">

    <div className="iv-loading-openurl" style={{display: self.state.loading ? 'block' : 'none'}}>
      <p>
      <img src="/images/loader.gif" alt="Chargement en cours" /><br/>
      Nous recherchons votre document dans la plateforme ISTEX.<br/>
      Veuillez patienter.
      </p>
    </div>
    
    {docRecord}

    <div style={{display: self.state.resourceUrl === null ? 'none' : 'block'}}>
      <a className="iv-openurl-fulltext-btn btn btn-primary" style={{display: self.state.resourceUrl ? 'block' : 'none', width: '14em'}} href={self.state.resourceUrl}>
          <div className="iv-istex-icon"></div> Accéder au document
      </a>
      <div className="iv-openurl-failed" style={{display: self.state.resourceUrl ? 'none' : 'block'}}>
        <div className="alert alert-warning" role="alert">
          <div className="iv-istex-icon"></div> Le document que vous souhaitez consulter est introuvable dans la plateforme ISTEX
        </div>
      </div>
    </div>

    <div className="iv-openurl-error" style={{display: self.state.errorCode ? 'block' : 'none'}}>
      <div className="alert alert-warning" role="alert">
        <div className="iv-istex-icon"></div> Le document que vous souhaitez consulter est temporairement indisponible à cause d'une erreur interne au niveau de la plateforme ISTEX. [<small><span className="glyphicon glyphicon-cog" title="Détail technique de l'erreur rencontrée"></span> {self.state.errorMsg} (erreur {self.state.errorCode})</small>]
      </div>
    </div>

    <div className="iv-openurl-error" style={{display: self.state.errorCode === 0 ? 'block' : 'none'}}>
      <div className="alert alert-warning" role="alert">
        <div className="iv-istex-icon"></div> Le document que vous souhaitez consulter est temporairement indisponible à cause d'une erreur réseau. Veuillez vérifier votre connexion Internet et <a href="">recharger cette page</a>. [<small><span className="glyphicon glyphicon-cog" title="Détail technique de l'erreur rencontrée"></span> {self.state.errorMsg} (erreur {self.state.errorCode})</small>]
      </div>
    </div>


  </div>
  <Footer />
</div>
    );
  }

  mapApiUrlToViewUrl(apiUrl) {
    let self = this;

    var matches = apiUrl.match(new RegExp('api\.istex\.fr\/document\/([A-Z0-9]{40})\/'));
    if (matches) {
      if (self.props.config.openUrlFTRedirectTo == 'api') {
        return { url: apiUrl, istexId: matches[1] };
      } else {
        return { url: '/' + matches[1], istexId: matches[1] };
      }
    } else {
      return { url: '', istexId: '' };
    }
  }

}

module.exports = ViewOpenUrl;

