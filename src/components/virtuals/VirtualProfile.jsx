import React, { Component } from 'react';

class VirtualProfile extends Component {
  render () {
    const selectedRecord = this.props.selectedRecord;
    return (
      <div className="VirtualProfile">
        <div className="form-row mb-1">
          <div className="col-12 col-md-3 col-lg-2">
            <label className="mb-0">Description</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.description}
          </div>  
        </div>
        <div className="form-row mb-1">
          <div className="col-12 col-md-3 col-lg-2">
            <label className="mb-0">Provenance</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.provenance}
          </div>  
        </div>
        <div className="form-row mb-1">
          <div className="col-12 col-md-3 col-lg-2">
            <label className="mb-0">Genotype</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.genotype}
          </div>  
        </div>
        <div className="form-row mb-1">
          <div className="col-12 col-md-3 col-lg-2">
            <label className="mb-0">Sequence</label>
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {selectedRecord.sequence}
          </div>  
        </div>
      </div>
    );
  }
}

export default VirtualProfile;