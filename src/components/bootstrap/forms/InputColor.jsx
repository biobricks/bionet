import React, { Component } from 'react';

class InputColor extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="color" 
          name={this.props.attribute}
          placeholder={this.props.placeholder}
          className="form-control" 
          value={this.props.value}
          onChange={this.props.onChange} 
        />
        {instructions}
        {error}
      </div>
    );
  }
}

export default InputColor;