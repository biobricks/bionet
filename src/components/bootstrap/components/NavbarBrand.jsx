import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarBrand extends Component {
  render() {
    const defaultClasses = "NavbarBrand navbar-brand";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        {(this.props.imgSrc) ? (
          <Link className={classes} to="/">     
            <img 
              src={this.props.imgSrc} 
              width={this.props.width || "30"} 
              height={this.props.height || "30"}
              alt={this.props.imgAlt}
              className="mr-3"
            />
            {this.props.children}
          </Link>    
        ) : (
          <>
            {this.props.children}
          </>
        )}  
      </div>
    );
  }
}

export default NavbarBrand;