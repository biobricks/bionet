import React, { Component } from 'react';

class Row extends Component {
  render() {
    const defaultClasses = "Row row";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export default Row;