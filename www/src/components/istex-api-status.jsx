import    React from 'react';

class IstexApiStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // do not show warning as long as the ajax
      // request is not finished
      isAvailable: true,

      // if not available we could have an error Msg to show
      errorCode: null,
      errorMsg: '',
    };
  }

  componentDidMount() {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {

      // call istex-api to check if the server is ready
      fetch(config.istexApiUrl + '/document/?q=*&output=id&sid=istex-view').then(function (response) {
        if (response.ok) {
          self.setState({isAvailable: true});
          return null;
        } else {
          self.setState({isAvailable: false, errorCode: response.status});
          return response.json();
        }
      }).then(function (responseData) {
        self.setState({errorMsg: responseData._error || ''});
      }).catch(function (err) {
        self.setState({isAvailable: false});
      });
    });

  }

  render() {
    let self = this;
    if (!self.state.isAvailable) {
      return (
        <div className="alert alert-danger" role="alert">
          L'API ISTEX est temporairement en panne. Veuillez réessayer plus tard.
          <br/><small><span className="glyphicon glyphicon-cog" title="Détail technique de l'erreur rencontrée"></span> Erreur {self.state.errorCode} : {self.state.errorMsg}</small>
        </div>
      );
    } else {
      return null;
    }
  }

}

module.exports = IstexApiStatus;