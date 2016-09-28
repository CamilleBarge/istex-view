var React = require('react');
var PDF   = require('react-pdf');

module.exports = React.createClass({
  displayName: 'Viewer',
  getInitialState: function () {
    return {
      currentPage: 2,
      pages: 0,
      file: 'https://api.istex.fr/document/0134F1716893F9118DCE7278BE3333CC40D50461/fulltext/pdf'
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
        <PDF page={this.state.currentPage} file={this.state.file} onDocumentComplete={this._onDocumentComplete} />
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
