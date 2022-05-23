import React, { Component } from 'react'

import './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        Created by &nbsp;
        <a href="https://personalproposals.co.uk">Personal Proposals</a> &nbsp; &#169;
        {" " + new Date().getFullYear()}
      </footer>
    );
  }
}
