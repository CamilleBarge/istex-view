import    React from 'react';
import cookie   from 'react-cookie';
import PDF      from './react-pdf.jsx';

module.exports = React.createClass({
  displayName: 'Viewer',

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

    // extract the ARK from the pathname in the URL
    // ex: https://view.istex.fr/ark:/67375/ABC-123456
    let ark = this.props.params.splat;

    // call istex-ark to convert the ark to an istexId 
    fetch('http://127.0.0.1:3000/' + ark).then(function (response) {
      return response.json();
    }).then(function (arkResolved) {
      self.setState({istexId: arkResolved.istexId});
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
    var pdfUrl = this.state.istexId ? 'https://api.istex.fr/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view' : '';
    return (
      <div className="container">
        <input type="text" placeholder="ISTEX JWT token" style={{width:'100%'}}
               value={this.state.istexToken} onChange={this.handleIstexTokenChange} />
        <br/>
        <input type="text" placeholder="ISTEX ID" style={{width:'100%'}}
               value={this.state.istexId} onChange={this.handleIstexIdChange} />

        <div>
          <button onClick={this.prevPage}>Previous page</button>
          <button onClick={this.nextPage}>Next page</button>
        </div>
        
        <PDF page={this.state.currentPage}
             file={pdfUrl}
             jwtToken={this.state.istexToken}
             onDocumentComplete={this._onDocumentComplete} />
      </div>
    );
  },
  _onDocumentComplete: function (pages) {
    this.setState({pages: pages});
  }

});
