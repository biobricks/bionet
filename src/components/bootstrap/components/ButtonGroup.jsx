import React, { Component } from 'react';

class ButtonGroup extends Component {
  render() {
    let classes = "btn-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div
        className={classes}
        role="group"
        aria-label={this.props.label}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ButtonGroup;