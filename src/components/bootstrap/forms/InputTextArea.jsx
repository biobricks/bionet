import React, { Component } from 'react';

class InputTextArea extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <textarea 
          type="textarea" 
          name={this.props.attribute}
          placeholder={this.props.placeholder}
          rows={this.props.rows || 3}
          className="form-control" 
          value={this.props.value}
          onChange={this.props.onChange} 
        ></textarea>
        {instructions}
        {error}
      </div>
    );
  }
}

export default InputTextArea;