import    React from 'react';
import    IstexArkStatus from './istex-ark-status.jsx';

module.exports = React.createClass({
  displayName: 'Home',

  render: function () {

    var arks = [
      'ark:/12345/X04-NLP74VSW-8', // 1A9EA12F2FE30BF2CFE9C45932AACC6F32A61F4F
      'ark:/12345/X02-PG09NZ97-Z', // 1C58FEE7BB7A1ABF1940261E3AEF615E8D4E80C7
      'ark:/12345/X01-38XC4LP5-7', // 3E4EADD3F8EABA5BC1571851A27FFB24AAE4B9D5
      'ark:/12345/X02-PDVQTSPL-Q', // 53A5856F93AA18A6A59474157FD32AF2F3E4DADB
      'ark:/12345/X04-3VNN2FVV-6'  // 6C0BCC79DAC47D158C984ED85AB5F2E565111948
    ];

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
        <h1>Visualisation interactive des documents ISTEX</h1>
        <p className="lead">
          ISTEX VIEW c'est une page HTML5 par document ISTEX. Chaque page permet de visualiser le document PDF augmenté d'interactivités contextuelles de type survol de la souris ou autre. Chaque page est citable via une URL de type ARK (ex : <a href="/ark:/12345/X01-38XC4LP5-7">https://view.istex.fr/ark:/12345/X01-38XC4LP5-7</a>)
          <br/><br/>
          Ci-dessous la liste des documents ISTEX proposés dans ce prototype qui propose un service de références bibliographiques interactives au survol de la souris.
        </p>
      </div>

      <IstexArkStatus />

      <p>
        {arks.map((ark) =>
          <a href={'/' + ark}  className="btn btn-default btn-lg" role="button">
            <span className="glyphicon glyphicon-file" aria-hidden="true"></span> <code>{ark}</code>
          </a>
        )}
      </p>

    </div>


    );
  },

  componentDidMount () {
    // to have tooltips cf http://getbootstrap.com/javascript/#tooltips-examples
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
      $('.container').popover()
    });
  },



});
