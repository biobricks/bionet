import React, { Component } from 'react';
import logo from '../images/bionet-logo.png';
import Navbar from './bootstrap/components/Navbar';
import NavbarLink from './bootstrap/components/NavbarLink';
import NavbarDropdown from './bootstrap/components/NavbarDropdown';
import NavbarDropdownLink from './bootstrap/components/NavbarDropdownLink';

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