import React, { Component } from 'react';

class DataPanelCard extends Component {
  render () {
    return (
      <div className="DataPanelCard card mt-3">
        {this.props.children}
      </div>
    );
  }
}

export default DataPanelCard;