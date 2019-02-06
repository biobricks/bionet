import React, { Component, Suspense, lazy } from 'react';
import logo from '../images/bionet-logo.png';

const Navbar = lazy(() => import('./bootstrap/components/Navbar'));
const NavbarLink = lazy(() => import('./bootstrap/components/NavbarLink'));
const NavbarDropdown = lazy(() => import('./bootstrap/components/NavbarDropdown'));
const NavbarDropdownLink = lazy(() => import('./bootstrap/components/NavbarDropdownLink'));

const navbarFallback = () => {
  return (
    <Navbar className="Navigation" brandImgSrc={logo} brandWidth="40">
      Loading...
    </Navbar>
  );
}

class Navigation extends Component {
  render () {
    return (
      <Suspense fallback={navbarFallback}>
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
      </Suspense>
    );
  }
}

export default Navigation;