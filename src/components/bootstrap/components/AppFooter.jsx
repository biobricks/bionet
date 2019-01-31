import React, { Component } from 'react';

class AppFooter extends Component {
  render() {
    let classes = "Footer bg-dark text-light p-3";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }      
}

export default AppFooter;