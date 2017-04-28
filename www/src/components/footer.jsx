import React from 'react';

class IstexViewFooter extends React.Component {
  render() {
    return (
      <footer className="iv-footer">
        <hr />
        <div className="col-lg-12">
          <p className="muted pull-right">
            <a href="https://github.com/istex/istex-view">ISTEX VIEW</a> version 2.1.1
          </p>
        </div>
      </footer>
    );
  }
}

module.exports = IstexViewFooter;