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

    if (!self.props.config.istexApiUrl) return;

    // call istex-api to check if the server is ready
    $.get(self.props.config.istexApiUrl + '/document/?q=*&output=id&sid=istex-view').done(function (response) {
        self.setState({isAvailable: true});
    }).fail(function (response) {
      self.setState({isAvailable: false, errorCode: response.status});
      if (response && response.responseJSON && response.responseJSON._error) {
        self.setState({errorMsg: response.responseJSON._error || ''});
      }
    });

  }

  render() {
    let self = this;
    if (!self.state.isAvailable) {
      return (
        <div className="alert alert-danger" role="alert">
          L'API ISTEX est temporairement indisponible. Veuillez réessayer plus tard.
          <br/><small><span className="glyphicon glyphicon-cog" title="Détail technique de l'erreur rencontrée"></span> Erreur {self.state.errorCode} : {self.state.errorMsg}</small>
        </div>
      );
    } else {
      return null;
    }
  }

}

module.exports = IstexApiStatus;