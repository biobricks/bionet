import React, { Component } from 'react';

class DataPanelTitle extends Component {
  render () {
    return (
      <div className="navbar-brand">
        <i className={`mdi mdi-${this.props.icon} mr-2`} />{this.props.title}
      </div>  
    );
  }
}

export default DataPanelTitle;