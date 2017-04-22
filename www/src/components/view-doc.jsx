import    React from 'react';
import {PDF, Viewer} from './react-pdf2.jsx';
import IstexApiStatus from './istex-api-status.jsx';

module.exports = React.createClass({
  displayName: 'ViewDoc',

  getInitialState: function () {
    return {
      currentPage: 1,
      pages: 0,
      istexId: '',
      istexToken: localStorage.getItem('istexToken')
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
    localStorage.setItem('istexToken', event.target.value);
  },
  handleIstexIdChange: function(event) {
    this.setState({istexId: event.target.value});
  },

  render: function () {
    let self = this;

    var pdfUrl = self.state.istexId ? self.config.istexApiUrl + '/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view' : '';
console.log('PDFURL', self.state.istexId, pdfUrl)

    var ReactPdf2 = pdfUrl ? (
      <PDF src={pdfUrl} jwtToken={this.state.istexToken}>
        <Viewer />
      </PDF>
    ) : null;

/*
        <Pdf page={this.state.currentPage}
             file={pdfUrl}
             jwtToken={this.state.istexToken}
             onDocumentComplete={this._onDocumentComplete} />
*/
    return (
      <div className="iv-doc-container">
        
        <div style={{textAlign: 'center'}}>
          <img src="/images/istex-logo-150.png" alt="" />
        </div>

        {ReactPdf2}

        <IstexApiStatus />

        <hr/>
        <input type="text" placeholder="ISTEX JWT token" style={{width:'100%'}}
               value={this.state.istexToken} onChange={this.handleIstexTokenChange} />
      </div>
    );
  },
  _onDocumentComplete: function (pages) {
    this.setState({pages: pages});
  }

});
