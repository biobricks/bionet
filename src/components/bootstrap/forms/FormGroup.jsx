import React, { Component } from 'react';

class FormGroup extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export default FormGroup;