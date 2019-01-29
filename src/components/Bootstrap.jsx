import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Bootstrap.scss';

/********/
/* Grid */
/********/

export const Container = class Container extends Component {
  render() {
    const defaultClasses = "Container container-fluid";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export const Row = class Row extends Component {
  render() {
    const defaultClasses = "Row row";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export const Column = class Column extends Component {
  render() {
    const defaultClasses = "Column";
    let colPropClasses = defaultClasses;
    colPropClasses += this.props.col ? ` col-${this.props.col}` : ' col';
    colPropClasses += this.props.colSm ? ` col-sm-${this.props.colSm}` : '';
    colPropClasses += this.props.colMd ? ` col-md-${this.props.colMd}` : '';
    colPropClasses += this.props.colLg ? ` col-lg-${this.props.colLg}` : '';
    colPropClasses += this.props.colXl ? ` col-xl-${this.props.colXl}` : ''; 
    let classes = this.props.className ? `${colPropClasses} ${this.props.className}` : colPropClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}



/**************/
/* Components */
/**************/

export const Card = class Card extends Component {
  render() {
    const defaultClasses = "Card card";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        { this.props.title && (
          <div className="card-header bg-dark text-light">
            {this.props.icon && <i className={`mdi mdi-${this.props.icon} mr-1`} /> }
            {this.props.title}
          </div>
        )}  
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const NavbarBrand = class NavbarBrand extends Component {
  render() {
    const defaultClasses = "NavbarBrand navbar-brand";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        <Link className={classes} to="/">
          {(this.props.imgSrc) ? (
            <>  
              <img 
                src={this.props.imgSrc} 
                width={this.props.width || "30"} 
                height={this.props.height || "30"}
                alt={this.props.imgAlt}
                className="mr-3"
              />
              {this.props.children}
            </>
          ) : (
            <>
              {this.props.children}
            </>
          )}
        </Link>        
      </div>
    );
  }
}

export const NavbarLink = class NavbarLink extends Component {
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

export const NavbarDropdown = class NavbarDropdown extends Component {
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

export const NavbarDropdownLink = class NavbarDropdownLink extends Component {
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


export const Navbar = class Navbar extends Component {
  render() {
    const defaultClasses = "Navbar navbar navbar-expand-lg navbar-dark bg-dark";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        <NavbarBrand
          imgSrc={this.props.brandImgSrc}
          width={this.props.brandWidth}
          height={this.props.brandHeight}
          to="/"
        >
          Brand
        </NavbarBrand>
        <button 
          className="navbar-toggler"
          type="button" 
          data-toggle="collapse"
          data-target={`#primary-navigation-links`} 
          aria-controls={`primary-navigation-links`} 
          aria-expanded="false" 
          aria-label="Toggle Primary Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="primary-navigation-links">
          <ul className="navbar-nav ml-auto">
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}