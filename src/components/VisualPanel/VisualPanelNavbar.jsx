import React, { Component } from 'react';
import VisualPanelTitle from './VisualPanelTitle';

class VisualPanelNavbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.onLinkClick = this.onLinkClick.bind(this);
  }
  
  onLinkClick(e) {
    let view = e.target.getAttribute('view');
    console.log('clicked', view);
    this.props.setView(view);
  }

  render () {
    //const selectedRecord = this.props.selectedRecord;
    //const recordName = selectedRecord.model === 'User' ? selectedRecord.username : selectedRecord.name;
    //const action = this.props.action;
    const view = this.props.view;
    return (
      <div className="VisualPanelNavbar navbar navbar-expand-lg navbar-dark bg-dark">

        <VisualPanelTitle
          icon={this.props.icon}
          title={this.props.title}
        />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#visualPanelNav" aria-controls="visualPanelNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="visualPanelNav">
          <ul className="navbar-nav ml-auto">

            <li className={view === 'grid' ? 'nav-item active' : 'nav-item'}>
              <button 
                className="nav-link bg-dark border-0"
                view="grid"
                onClick={this.onLinkClick}
              >
                <i className="mdi mdi-grid" view="grid"/>
              </button>
            </li>

            <li className={view === '2D' ? 'nav-item active' : 'nav-item'}>
              <button 
                className="nav-link bg-dark border-0"
                view="2D"
                onClick={this.onLinkClick}
              >
                2D
              </button>
            </li>

            <li className={view === '3D' ? 'nav-item active' : 'nav-item'}>
              <button 
                className="nav-link bg-dark border-0"
                view="3D"
                onClick={this.onLinkClick}
              >
                3D
              </button>
            </li>

          </ul>
        </div>

        {this.props.children}

    </div>  
    );
  }

}

export default VisualPanelNavbar;