import React, { Component } from 'react';
import moment from 'moment';

class UserProfile extends Component {
  render () {
    const selectedRecord = this.props.selectedRecord;
    const createdAtWrapper = moment(selectedRecord.createdAt);
    const createdAt = createdAtWrapper.format("MM/DD/YY");
    const updatedAtWrapper = moment(selectedRecord.updatedAt);
    const updatedAt = updatedAtWrapper.format("MM/DD/YY");
    const datesMatch = String(createdAt) === String(updatedAt);
    return (
      <div className="UserProfile">
        <div className="form-row mb-1">
          <div className="col-12">
            <label className="mb-0">
              Joined {createdAt}
              {!datesMatch && <>&nbsp;-&nbsp;Last Updated {updatedAt}</>}
            </label>
          </div> 
        </div>
      </div>
    );
  }
}

export default UserProfile;