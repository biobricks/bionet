import React, { Component } from 'react';
//import NavbarBrand from './NavbarBrand';
import '../Bootstrap.scss';

class NavCard extends Component {
  render() {
    const defaultClasses = "Card card";
    const defaultNavClasses = "Navbar navbar navbar-expand-lg navbar-dark bg-dark";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    //const {icon, title, body} = this.props;
    return (
      <div className={classes}>
        { title && (
          <div className={defaultNavClasses}>

          </div>
        )}
        <div className="card-body">
          {body}
        </div>
      </div>
    );
  }
}

export default NavCard;