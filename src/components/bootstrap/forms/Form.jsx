import React, { Component } from 'react';

class Form extends Component {
  render() {
    let classes = "form";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <form style={this.props.style} className={classes} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;