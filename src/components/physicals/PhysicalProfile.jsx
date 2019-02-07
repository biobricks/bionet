import React, { Component } from 'react';
import moment from 'moment';

class PhysicalProfile extends Component {
  render () {
    const selectedRecord = this.props.selectedRecord;
    const createdAtWrapper = moment(selectedRecord.createdAt);
    const createdAt = createdAtWrapper.format("MM/DD/YY");
    const updatedAtWrapper = moment(selectedRecord.updatedAt);
    const updatedAt = updatedAtWrapper.format("MM/DD/YY");
    const datesMatch = String(createdAt) === String(updatedAt);
    return (
      <div className="PhysicalProfile">
        <div className="form-row mb-1">
          <div className="col-12">
            <label className="mb-0">
              Created {createdAt}
              {!datesMatch && <>&nbsp;-&nbsp;Last Updated {updatedAt}</>}
            </label>
          </div> 
        </div>      
        <div className="form-row" mb-1>
          <div className="col-12 col-md-3 col-lg-2">
            <label className="mb-0">Description</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.description}
          </div>  
        </div>
      </div>
    );
  }
}

export default PhysicalProfile;