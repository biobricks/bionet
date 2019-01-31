import React, { Component } from 'react';

class Container extends Component {
  render() {
    const defaultClasses = "Container container-fluid";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export default Container;