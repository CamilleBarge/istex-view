import    React from 'react';
import {PDF, PDFViewer} from './react-pdf.jsx';
import IstexApiStatus from './istex-api-status.jsx';

class ViewDoc extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pages: 0,
      istexId: '',
      istexToken: localStorage.getItem('istexToken')
    };
  }

  componentDidMount() {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {
      self.config = config;
      self.setState({istexId: self.props.match.params[0]});
    });

  }

  prevPage(ev) {
    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
  }

  nextPage(ev) {
    ev.preventDefault();
    this.setState({ currentPage: this.state.currentPage < this.state.pages ? this.state.currentPage + 1 : this.state.pages });
  }

  handleIstexTokenChange(event) {
    this.setState({istexToken: event.target.value});
    localStorage.setItem('istexToken', event.target.value);
  }

  handleIstexIdChange(event) {
    this.setState({istexId: event.target.value});
  }

  render() {
    let self = this;

    var pdfUrl = self.state.istexId ? self.config.istexApiUrl + '/document/' + this.state.istexId + '/fulltext/pdf?sid=istex-view' : '';
console.log('PDFURL', self.state.istexId, pdfUrl)

    var ReactPdf2 = pdfUrl ? (
      <PDF src={pdfUrl} jwtToken={this.state.istexToken}>
        <PDFViewer />
      </PDF>
    ) : null;

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
  }

  _onDocumentComplete(pages) {
    this.setState({pages: pages});
  }

}


module.exports = ViewDoc;