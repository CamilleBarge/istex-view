import    React from 'react';

class IstexApiDocRecord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    let self = this;

    // request the istex-view config
    fetch('/config.json').then(function (response) {
      return response.json();
    }).then(function (config) {
      self.config = config;

      let theUrl = self.config.istexApiUrl + '/document/' + self.props.istexId + '/?sid=istex-view';
      fetch(theUrl).then(function (response) {
        return response.json();
      }).then(function (docRecord) {
        self.setState({
          atitle: docRecord.title,
          aauthor: docRecord.author,
          doi: docRecord.doi ? docRecord.doi[0] : null,
          publicationDate: docRecord.publicationDate,
          abstract: docRecord.abstract,

          title: docRecord.host.title,
          issn: docRecord.host.issn ? docRecord.host.issn[0] : null,
          eissn: docRecord.host.eissn ? docRecord.host.eissn[0] : null,
          vol: docRecord.host.volume,
          issue: docRecord.host.issue,
          pageFirst: docRecord.host.pages.first,
          pageLast: docRecord.host.pages.last,

          url: theUrl
        });
      }).catch(function (err) {
        self.setState({
          title: 'not found'
        });
      });

    });

  }

  render() {
    let self = this;

    
    let authors = [];
    self.state.aauthor && self.state.aauthor.forEach(function (author, idX) {
      console.log(author);
      let affiliations = [];
      author.affiliations && author.affiliations.forEach(function (affi, idX2) {
        affiliations.push(<span className="iv-author-affi glyphicon glyphicon-eye-open" title={affi} key={idX2}></span>)
      });
      authors.push(<span className="iv-author-block" key={idX}><span className="iv-author-name" title={author.affiliations[0]}><a>{author.name}</a></span> {affiliations}{idX < affiliations.length ? ',' : ''}</span>);
    });


    return (
      <div className="iv-doc-record well">
        <h3>{self.state.atitle}</h3>
        <p>
          <span className="glyphicon glyphicon-barcode"></span> Article publié dans <a href="#">{self.state.title}</a> <span className="iv-doc-record-ref">[ <span className="">{self.state.publicationDate}</span>, Volume <span className="">{self.state.vol}</span>, Issue <span className="">{self.state.issue}</span>, Pages <span className="">{self.state.pageFirst}{self.state.pageLast}</span>, ISSN : {self.state.issn}, eISSN : {self.state.eissn}, DOI : {self.state.doi} ]</span></p>
        <p><span className="glyphicon glyphicon-user"></span> Article écrit par {authors}</p>
        <p>{self.state.abstract}</p>
      </div>
    );
  }

}

module.exports = IstexApiDocRecord;
