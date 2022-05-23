import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p> Click &nbsp;
          <Link to="/" key='home' className="nav-link nav-link-underline">here</Link> 
          &nbsp; to return to the homepage
        </p>
      </div>
    );
  }
}

export default NotFoundPage;
