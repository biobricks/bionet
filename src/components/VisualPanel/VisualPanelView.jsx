import React, { Component } from 'react';


class VisualPanelView extends Component {
  render () {
    //const selectedRecord = this.props.selectedRecord;
    const view = this.props.view;
    const showGrid = view === 'grid';
    const show2D = view === '2D';
    const show3D = view === '3D';
    return (
      <div className="DataPanelView">
        {showGrid && <div className="card-body">Grid Goes Here</div>}
        {show2D && <div className="card-body">2D Goes Here</div>}
        {show3D && <div className="card-body">3D Goes Here</div>}
      </div>
    );
  }
}

export default VisualPanelView;