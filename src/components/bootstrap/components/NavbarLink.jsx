import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarLink extends Component {
  render() {
    const liClasses = "NavbarLink nav-item";
    const classes = this.props.className ? `${liClasses} ${this.props.className}` : liClasses;
    return (
      <li className={classes}>
        <NavLink to={this.props.to} className="nav-link">
          {this.props.children}
        </NavLink>        
      </li>
    );
  }
}

export default NavbarLink;