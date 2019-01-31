import React, { Component } from 'react';
import { Navbar, NavbarLink, NavbarDropdown, NavbarDropdownLink } from './Bootstrap';
import logo from '../images/bionet-logo.png';

class Navigation extends Component {
  render () {
    return (
      <Navbar className="Navigation" brandImgSrc={logo} brandWidth="40">
        { this.props.isLoggedIn ? (
          <>
            <NavbarDropdown label="Account" icon="account" id="account-dropdown">
              <NavbarDropdownLink to="/profile" label="Profile" icon="account" />
              <button className="dropdown-item" onClick={this.props.logout}>
                <i className="mdi mdi-logout-variant mr-1" />Logout
              </button>
            </NavbarDropdown>
          </>
        ) : (
          <>
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