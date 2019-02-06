import React, { Component } from 'react'; 
import FadeIn from 'react-fade-in';

class DataPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedRecord = this.props.selectedRecord;
    const action = this.props.action;
    return (
      <div className="DataPanel">
        <FadeIn>
          <>
            {(action === 'view') && (
              <div className="card mt-3">
                <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="navbar-brand">
                    <i className={`mdi mdi-${selectedRecord.icon} mr-2`} />{selectedRecord.name}
                  </div>
                  <div className="card-body">
                
                  </div>
                </div>
              </div>
            )}
          </>
        </FadeIn>
      </div>
    );
  }
}

export default DataPanel;
