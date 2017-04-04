import    React from 'react';
import    IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'Home',

  getInitialState: function () {
    return {
      arks: [],
      istexIds: []
    };
  },

  render: function () {
    let self = this;
    var istexIds = self.state.istexIds;

    return (
 
    <div className="container" role="main">

      <div className="header clearfix">

        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation" className="active"><a href="/">Home</a></li>
            <li role="presentation"><a href="https://github.com/istex/istex-view">Code source</a></li>
          </ul>
        </nav>
        
        <h3 className="text-muted">ISTEX VIEW</h3>
      </div>

      <div className="jumbotron">
        <h1>Visualisation interactive des objets documentaires ISTEX</h1>
        <p className="lead">
          ISTEX VIEW c'est une page HTML5 par objet documentaire ISTEX. Chaque page permet de visualiser le document PDF augmenté d'interactivités contextuelles de type survol de la souris ou autre. Chaque page pointe vers un objet documentaire ISTEX. Exemple : <a href="/4B64F4937471EA91F40AABC46B2D4CD5D5CC304E">https://view.istex.fr/4B64F4937471EA91F40AABC46B2D4CD5D5CC304E</a><br/>(les ARK seront prochainement supportés)
        </p>
        <p className="lead">
          ISTEX VIEW c'est aussi une interface HTML au dessus de l'OpenURL de l'API ISTEX. Exemple: <a href="/openurl?rft_id=info:doi/10.1136/acupmed-2012-010183">https://view.istex.fr/openurl?rft_id=info:doi/10.1136/acupmed-2012-010183</a>
        </p>        
      </div>

      <IstexApiStatus />

      <p>
        {istexIds.map((istexid) =>
          <a href={'/' + istexid}  className="btn btn-default btn-lg" role="button">
            <span className="glyphicon glyphicon-file" aria-hidden="true"></span> <code>{istexid}</code>
          </a>
        )}
      </p>

    </div>


    );
  },

  componentDidMount () {
    let self = this;

    // to have tooltips cf http://getbootstrap.com/javascript/#tooltips-examples
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
      $('.container').popover()
    });


    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {

      // fetch the first 10 istex documents and
      // extract the ARKs and the istexIds
      fetch(config.istexApiUrl + '/document/?q=*&output=id,ark&sid=istex-view').then(function (response) {
        return response.json();
      }).then(function (apiJson) {
        var arks = apiJson.hits.map(function (hit) {
          return hit.ark;
        });
        var istexIds = apiJson.hits.map(function (hit) {
          return hit.id;
        });
        self.setState({arks: arks, istexIds: istexIds});
      }).catch(function (err) {
        self.setState({arks: [], istexIds: []});
      });


    });    
  },



});
