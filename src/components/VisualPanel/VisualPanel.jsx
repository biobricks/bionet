import React, { Component } from 'react';
import VisualPanelNavbar from './VisualPanelNavbar';
import VisualPanelView from './VisualPanelView';

class VisualPanel extends Component {
  render () {
    const selectedRecord = this.props.selectedRecord;
    const recordName = selectedRecord.model === 'User' ? selectedRecord.username : selectedRecord.name;
    const action = this.props.action;
    let title;
    switch (action) {
      case 'list':
        title = `${selectedRecord.model}s`;
        break;
      case 'view':
        title = recordName;
        break; 
      case 'new':
        title = `New ${selectedRecord.model}`;
        break;
      case 'edit':
        title = `Edit ${recordName}`;
        break;  
      case 'delete':
        title = `Delete ${recordName}`;
        break;
      case 'add container':
        title = `Add Container To ${recordName}`;
        break; 
      case 'add physical':
        title = `Add Physical To ${recordName}`;
        break;
      case 'move':
        title = `Move ${recordName}`;
        break;      
      default:
        title = recordName;
    } 
    return (
      <div className="VisualPanel card mt-3">
        <VisualPanelNavbar
          {...this.props}
          icon={selectedRecord.icon}
          title={title}            
        />
        {action === 'view' && <VisualPanelView {...this.props} />}
      </div>
    );
  }
}

export default VisualPanel;