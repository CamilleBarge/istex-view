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
      file: 'https://api-integ.istex.fr/document/195738F43F3FE6AD276CD8BAC3E554562B5BD60D/fulltext/pdf',
      token: ''
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
  onFileChange: function (ev) {
    this.setState({
      file: ev.target.files[0]
    });
  },
  render: function () {
    return (
      <div className="container">
        <PDF page={this.state.currentPage} file={this.state.file} token={this.state.token} onDocumentComplete={this._onDocumentComplete} />
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
