import React, { Component } from 'react';

class Column extends Component {
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

export default Column;