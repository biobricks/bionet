import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {
  render() {
    let classes = "btn rounded-0";
    if (this.props.color) { 
      if (this.props.outline) {
        classes += ` btn-outline-${this.props.color}`;
      } else {
        classes += ` btn-${this.props.color}`;
      }
    }
    if (this.props.className) { classes += ` ${this.props.className}` }
    if (this.props.link) {
      return (
        <Link
          to={this.props.to}
          className={classes}
        >
          {this.props.children}
        </Link>
      );
    } else {
      if (this.props.submit) {
        return (
          <button
            className={classes}
            type="submit"
          >
            {this.props.children}
          </button>
        )
      } else {
        return (
          <button
            className={classes}
            onClick={this.props.onClick}
            mode={this.props.mode}
          >
            {this.props.children}
          </button>
        );
      }  
    }
  }
}

export default Button;