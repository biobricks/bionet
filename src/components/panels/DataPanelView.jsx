import React, { Component } from 'react';
import UserProfile from '../users/UserProfile';
import LabProfile from '../labs/LabProfile';
import ContainerProfile from '../containers/ContainerProfile';
import PhysicalProfile from '../physicals/PhysicalProfile';
import VirtualProfile from '../virtuals/VirtualProfile';


class DataPanelView extends Component {
  render () {
    const model = this.props.selectedRecord.model;
    return (
      <div className="DataPanelView card-body">
        {model === 'User' && <UserProfile {...this.props} />}
        {model === 'Lab' && <LabProfile {...this.props} />}
        {model === 'Container' && <ContainerProfile {...this.props} />}
        {model === 'Physical' && <PhysicalProfile {...this.props} />}
        {model === 'Virtual' && <VirtualProfile {...this.props} />}
      </div>
    );
  }
}

export default DataPanelView;