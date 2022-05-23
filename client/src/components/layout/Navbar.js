import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

import './Navbar.scss';

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();

    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { pathname } = this.props.location;

    const authLinks = [
      <Link to="/dashboard" key='dashboard' className="nav-link nav-link-underline">
        Dashboard
      </Link>,
      <Link to="/settings" key='settings' className="nav-link nav-link-underline">
        Settings
      </Link>,
      <a
        href='/#'
        key='logout'
        onClick={this.onLogoutClick.bind(this)}
        className="nav-link nav-link-underline"
      >
        Logout
      </a>
    ];
    
    const accessLinks = [
      <Link to="/" key='home' className="nav-link nav-link-underline">
        Home
      </Link>,
      <Link to="/register" key='register' className="nav-link nav-link-underline">
        Register
      </Link>,
      <Link to="/login" key='login' className="nav-link nav-link-underline">
        Login
      </Link>,
    ];

    const guestLinks = [
      <a key='home' href="#home" className="nav-link nav-link-underline">
        Home
      </a>,
      <a key='info' href="#info" className="nav-link nav-link-underline">
        Info
      </a>,
      <a key='rsvp' href="#rsvp" className="nav-link nav-link-underline">
        RSVP
      </a>,
    ];

    return (
      <nav id="navbar">
        <ul className="nav-links">
          {pathname === '/login' || pathname === '/register' 
            ? accessLinks 
            : isAuthenticated 
              ? authLinks 
              : guestLinks}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));