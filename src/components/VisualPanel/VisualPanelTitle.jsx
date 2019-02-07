import React, { Component } from 'react';

class VisualPanelTitle extends Component {
  render () {
    return (
      <div className="VisualPanelTitle navbar-brand">
        <i className={`mdi mdi-${this.props.icon} mr-2`} />{this.props.title}
      </div>  
    );
  }
}

export default VisualPanelTitle;