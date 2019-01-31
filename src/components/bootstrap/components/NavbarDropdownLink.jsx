import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarDropdownLink extends Component {
  render() {
    let classes = "dropdown-item";
    let iconClasses = "";
    let hasIcon = this.props.icon && this.props.icon.length > 0;
    if (hasIcon) { iconClasses += `mdi mdi-${this.props.icon} mr-1` }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <NavLink to={this.props.to} className={classes}>
        { hasIcon && <i className={iconClasses} /> }
        {this.props.label}
      </NavLink>
    );
  }      
}

export default NavbarDropdownLink;