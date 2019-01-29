import React, { Component } from 'react';
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

