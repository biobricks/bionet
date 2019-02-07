import React, { Component } from 'react'; 
import FadeIn from 'react-fade-in';
import DataPanelCard from './DataPanelCard';
import DataPanelNavbar from './DataPanelNavbar';
import DataPanelList from './DataPanelList';
import DataPanelView from './DataPanelView';
import DataPanelNew from './DataPanelNew';
import DataPanelEdit from './DataPanelEdit';
import DataPanelDelete from './DataPanelDelete';
import DataPanelAdd from './DataPanelAdd';
import DataPanelMove from './DataPanelMove';

class DataPanel extends Component {

  render() {
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
      <div className="DataPanel">
        <FadeIn>
          <DataPanelCard>
            <DataPanelNavbar
              {...this.props}
              icon={selectedRecord.icon}
              title={title}            
            />
            {action === 'list' && <DataPanelList {...this.props} />}
            {action === 'view' && <DataPanelView {...this.props} />}
            {action === 'new' && <DataPanelNew {...this.props} />}
            {action === 'edit' && <DataPanelEdit {...this.props} />}
            {action === 'delete' && <DataPanelDelete {...this.props} />}
            {action === 'add container' && <DataPanelAdd {...this.props} add="Container"/>}
            {action === 'add physical' && <DataPanelAdd {...this.props} add="Physical"/>}
            {action === 'move' && <DataPanelMove {...this.props}/>}
          </DataPanelCard>
        </FadeIn>
      </div>
    );
  }
}

export default DataPanel;
