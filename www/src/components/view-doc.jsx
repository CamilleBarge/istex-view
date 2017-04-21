import    React from 'react';
import cookie   from 'react-cookie';
import Pdf       from './react-pdf.jsx';
import IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'ViewDoc',

  getInitialState: function () {
    return {
      currentPage: 1,
      pages: 0,
      istexId: '',
      istexToken: cookie.load('istexToken')
    };
  },

  componentDidMount () {
    let self = this;


    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {
      self.config = config;
      self.setState({istexId: self.props.params.splat});
    });


  },

  prevPage: function (ev) {
    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
  },
  nextPage: function (ev) {
    ev.preventDefault();
    this.setState({ currentPage: this.state.currentPage < this.state.pages ? this.state.currentPage + 1 : this.state.pages });
  },
  handleIstexTokenChange: function(event) {
    this.setState({istexToken: event.target.value});
    cookie.save('istexToken', event.target.value, { path: '/' });
  },
  handleIstexIdChange: function(event) {
    this.setState({istexId: event.target.value});
  },

  render: function () {
    let self = this;

    var pdfUrl = this.state.istexId ? self.config.istexApiUrl + '/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view' : '';
    return (
      <div className="container">
        <IstexApiStatus />
                
        <Pdf page={this.state.currentPage}
             file={pdfUrl}
             jwtToken={this.state.istexToken}
             onDocumentComplete={this._onDocumentComplete} />

        <div>
          <button onClick={this.prevPage}>Previous page</button>
          <button onClick={this.nextPage}>Next page</button>
        </div>

        <hr/>
        <input type="text" placeholder="ISTEX JWT token" style={{width:'100%'}}
               value={this.state.istexToken} onChange={this.handleIstexTokenChange} />
        <br/>
        <input type="text" placeholder="ISTEX ID" style={{width:'100%'}}
               value={this.state.istexId} onChange={this.handleIstexIdChange} />
      </div>
    );
  },
  _onDocumentComplete: function (pages) {
    this.setState({pages: pages});
  }

});
