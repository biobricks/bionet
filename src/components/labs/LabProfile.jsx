import React, { Component } from 'react';

class LabProfile extends Component {
  render () {
    const selectedRecord = this.props.selectedRecord;
    return (
      <div className="LabProfile">
        <div className="form-row">
          <div className="col-12 col-md-3 col-lg-2">
          <label>Description</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.description}
          </div>  
        </div>
      </div>
    );
  }
}

export default LabProfile;