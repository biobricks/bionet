import React, { Component } from 'react';

class InputNumber extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="number"
          className="form-control"
          name={this.props.attribute} 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          step={this.props.step ? this.props.step : 1} 
          min={this.props.min ? this.props.min : -99999999999999}
          max={this.props.max ? this.props.max : 99999999999999}           
        />
        {instructions}
        {error}
      </div>
    );      
  }
}

export default InputNumber;