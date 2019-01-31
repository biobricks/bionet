import React, { Component } from 'react';
import '../Bootstrap.scss';

class Card extends Component {
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

export default Card;