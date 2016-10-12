import    React from 'react';
import cookie   from 'react-cookie';
import PDF      from './react-pdf.jsx';

module.exports = React.createClass({
  displayName: 'Viewer',

  getInitialState: function () {
    return {
      currentPage: 1,
      pages: 0,
      istexId: (cookie.load('istexId') ? cookie.load('istexId') : '195738F43F3FE6AD276CD8BAC3E554562B5BD60D'),
      istexToken: cookie.load('istexToken')
    };
  },

  componentDidMount () {
    // extract the ARK from the pathname in the URL
    // ex: https://view.istex.fr/ark:/67375/ABC-123456
    let ark = this.props.params.splat;

    // // TODO: call the ark2istexid temporary web service
    // //       to convert the ark to an istexId 
    // fetch('https://ark-resolver.istex.fr/ark:/67375/ABC-123456', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'Bearer ' + this.state.istexToken
    //   }
    // }).then(function (response) {
    //   return response.text();
    // }).then(function (istexId) {
    //   this.setState({istexId: istexId});
    // });

    this.setState({istexId: '195738F43F3FE6AD276CD8BAC3E554562B5BD60D'});
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
    cookie.save('istexId', event.target.value, { path: '/' });
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
