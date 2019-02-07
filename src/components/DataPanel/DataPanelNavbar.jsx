import React, { Component } from 'react';
import DataPanelTitle from './DataPanelTitle';

class DataPanelNavbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.onLinkClick = this.onLinkClick.bind(this);
  }
  
  onLinkClick(e) {
    let action = e.target.getAttribute('action');
    console.log('clicked', action);
    this.props.setAction(action);
  }

  render () {
    const selectedRecord = this.props.selectedRecord;
    const showAddMenu = selectedRecord.model === 'Lab' || selectedRecord.model === 'Container';
    const recordName = selectedRecord.model === 'User' ? selectedRecord.username : selectedRecord.name;
    const action = this.props.action;
    return (
      <div className="DataPanelNavbar navbar navbar-expand-lg navbar-dark bg-dark">

        <DataPanelTitle
          icon={this.props.icon}
          title={this.props.title}
        />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#selectedRecordNav" aria-controls="selectedRecordNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="selectedRecordNav">
          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle bg-dark border-0" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="mdi mdi-settings mr-2" />
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button 
                  className={action === 'view' ? 'dropdown-item active' : 'dropdown-item'}
                  action="view"
                  onClick={this.onLinkClick}
                >
                  <i className={`mdi mdi-${selectedRecord.icon} mr-2`} action="edit"/>View {recordName}
                </button>
                <button 
                  className={action === 'edit' ? 'dropdown-item active' : 'dropdown-item'}
                  action="edit"
                  onClick={this.onLinkClick}
                >
                  <i className="mdi mdi-pencil mr-2" action="edit"/>Edit {recordName}
                </button>
                <button 
                  className={action === 'delete' ? 'dropdown-item active' : 'dropdown-item'}
                  action="delete"
                  onClick={this.onLinkClick}
                >
                  <i className="mdi mdi-delete mr-2" action="delete"/>Delete {recordName}
                </button>                
                {/* <button 
                  className={action === 'list' ? 'dropdown-item active' : 'dropdown-item'}
                  action="list"
                  onClick={this.onLinkClick}
                >
                  <i className="mdi mdi-format-list-bulleted mr-2" action="list"/>List {selectedRecord.model}s
                </button> */}
                {/* <button 
                  className={action === 'new' ? 'dropdown-item active' : 'dropdown-item'}
                  action="new"
                  onClick={this.onLinkClick}
                >
                  <i className="mdi mdi-plus mr-2" action="new"/>New {selectedRecord.model}
                </button> */}
              </div>
            </li>

            {showAddMenu && (
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle bg-dark border-0" id="addDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="mdi mdi-plus mr-2" />
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <button 
                    className={action === 'add container' ? 'dropdown-item active' : 'dropdown-item'}
                    action="add container"
                    onClick={this.onLinkClick}
                  >
                    <i className="mdi mdi-grid mr-2" action="add container"/>Add Container
                  </button>
                  <button 
                    className={action === 'add physical' ? 'dropdown-item active' : 'dropdown-item'}
                    action="add physical"
                    onClick={this.onLinkClick}
                  >
                    <i className="mdi mdi-flask mr-2" action="add physical"/>Add Physical
                  </button>
                </div>
              </li>
            )}  

          </ul>
        </div>

        {this.props.children}

    </div>  
    );
  }

}

export default DataPanelNavbar;