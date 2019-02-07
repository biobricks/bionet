import React, { Component } from 'react';
import logo from '../images/bionet-logo.png';
import Navbar from './bootstrap/components/Navbar';
import NavbarLink from './bootstrap/components/NavbarLink';
import NavbarDropdown from './bootstrap/components/NavbarDropdown';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onProfileLinkClick = this.onProfileLinkClick.bind(this);
  }

  onProfileLinkClick(e) {
    this.props.setSelectedRecord('view', this.props.currentUser);
  }

  render () {
    return (
        <Navbar className="Navigation" brandImgSrc={logo} brandWidth="40">
          { this.props.isLoggedIn ? (
            <>
              <NavbarDropdown label="Account" icon="account" id="account-dropdown">
                <button 
                  className="dropdown-item" 
                  onClick={this.onProfileLinkClick}
                >
                  <i className="mdi mdi-account mr-1" />Profile
                </button>
                <button 
                  className="dropdown-item" 
                  onClick={this.props.logout}
                >
                  <i className="mdi mdi-logout-variant mr-1" />Logout
                </button>
              </NavbarDropdown>
            </>
          ) : (
            <>t 
            <NavbarLink to="/login">
              <i className="mdi mdi-login-variant mr-1" />Login
            </NavbarLink> 
            <NavbarLink to="/signup">
              <i className="mdi mdi-account-plus mr-1" />Sign Up
            </NavbarLink> 
            </>
          )}
          <NavbarLink to="/about">About</NavbarLink>
        </Navbar>
    );
  }
}

export default Navigation;