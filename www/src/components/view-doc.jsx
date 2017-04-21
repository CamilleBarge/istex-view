import    React from 'react';
import cookie   from 'react-cookie';
import IstexApiDocRecord from './istex-api-doc-record.jsx';
import Pdf       from './react-pdf.jsx';
var Pdf2    = require('./react-pdf2.jsx').PDF;
var Viewer2 = require('./react-pdf2.jsx').Viewer;
//, Viewer2}      from './react-pdf2.jsx';
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

    var docRecord = self.state.istexId ? <IstexApiDocRecord istexId={self.state.istexId} /> : null;

    var pdfUrl = this.state.istexId ? self.config.istexApiUrl + '/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view' : '';

/*

        <Pdf page={this.state.currentPage}
             file={pdfUrl}
             jwtToken={this.state.istexToken}
             onDocumentComplete={this._onDocumentComplete} />
*/
    const PDF_URL = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

    return (
      <div className="iv-doc-container">
        <IstexApiStatus />

        {docRecord}

        <Pdf2 src={PDF_URL}>
          <Viewer2 />
        </Pdf2>

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
