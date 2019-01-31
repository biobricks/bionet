import React, { Component } from 'react';

class SubmitGroup extends Component {
  render() {
    let classes = "form-group text-center";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={this.props.onCancel || function() { alert('Cancel Edit Button Clicked!')}}>
            <i className="mdi mdi-cancel mr-2"/>Cancel
          </button>
          <button type="submit" className="btn btn-success">
            <i className="mdi mdi-content-save mr-2"/>Save
          </button>
        </div>
      </div>
    );
  }
}

export default SubmitGroup;