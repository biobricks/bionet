import React, { Component } from 'react';
import NavbarBrand from './NavbarBrand';

class Navbar extends Component {
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
        ></NavbarBrand>
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

export default Navbar;