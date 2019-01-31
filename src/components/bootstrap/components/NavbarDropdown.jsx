import React, { Component } from 'react';

class NavbarDropdown extends Component {
  render() {
    let liClasses = "nav-item dropdown";
    let iconClasses = "";
    if (this.props.className) { liClasses += ` ${this.props.className}` }
    let hasIcon = this.props.icon && this.props.icon.length > 0;
    if (hasIcon) { iconClasses += `mdi mdi-${this.props.icon} mr-1` }
    return (
      <li className={liClasses}>
        <button 
          className="nav-link dropdown-toggle text-capitalize bg-dark border-0" 
          id={this.props.id}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          { hasIcon && <i className={iconClasses} /> }
          {this.props.label}
        </button>
        <div 
          className="dropdown-menu"
          aria-labelledby={this.props.id}
        >
          {this.props.children}
        </div>
      </li>
    );
  }      
}

export default NavbarDropdown;