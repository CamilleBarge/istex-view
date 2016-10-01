/**
 * @jsx React.DOM
 */

var React = require('react');
var PDF   = require('./react-pdf.js');

module.exports = React.createClass({
  displayName: 'Viewer',
  getInitialState: function () {    
    return {
      currentPage: 2,
      pages: 0,
      istexId: '195738F43F3FE6AD276CD8BAC3E554562B5BD60D',
      istexToken: ''
    };
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
  },
  handleIstexIdChange: function(event) {
    this.setState({istexId: event.target.value});
  },
  render: function () {
    var pdfUrl = 'https://api-integ.istex.fr/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view';
    return (
      <div className="container">
        <input type="text" placeholder="ISTEX JWT token" style={{width:'100%'}}
               value={this.state.istexToken} onChange={this.handleIstexTokenChange} />
        <br/>
        <input type="text" placeholder="ISTEX ID" style={{width:'100%'}}
               value={this.state.istexId} onChange={this.handleIstexIdChange} />
        <PDF page={this.state.currentPage}
             file={pdfUrl}
             jwtToken={this.state.istexToken}
             onDocumentComplete={this._onDocumentComplete} />
        <div>
          <button onClick={this.prevPage}>Previous page</button>
          <button onClick={this.nextPage}>Next page</button>
        </div>
      </div>
    );
  },
  _onDocumentComplete: function (pages) {
    this.setState({pages: pages});
  }
});
