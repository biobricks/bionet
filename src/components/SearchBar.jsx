import React, { Component, Suspense } from 'react'; 
import FadeIn from 'react-fade-in';
import Api from '../modules/Api';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import './SearchBar.scss';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labs: [],
      containers: [],
      physicals: [],
      virtuals: [],
      records: []
    };
    this.getData = this.getData.bind(this);
  }
  
  // async getData() {
  //   try {
  //     const labsRes = await Api.get('labs');
  //     // const containersRes = await Api.get('containers');
  //     // const physicalsRes = await Api.get('physicals');
  //     // const virtualsRes = await Api.get('virtuals');
  //     if (this.props.debug) {
  //       console.log('SearchBar.getData.res.labs', labsRes.data);
  //       // console.log('SearchBar.getData.res.containers', containersRes);
  //       // console.log('SearchBar.getData.res.physicals', physicalsRes);
  //       // console.log('SearchBar.getData.res.virtuals', virtualsRes);
  //     }  
  //     return {
  //       records: labsRes.data
  //     }  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async getData() {
    try {
      let records = [];

      let labs = [];
      let labsResponse = await Api.get("labs");
      if (labsResponse.data) {
        for(let i = 0; i < labsResponse.data.length; i++){
          labsResponse.data[i]['type'] = 'Lab';
          labsResponse.data[i]['icon'] = 'teach';
          labsResponse.data[i]['label'] = `${labsResponse.data[i].name}`;
        }
        labs = labsResponse.data;
        records = records.concat(labsResponse.data);
      }

      let containersResponse = await Api.get("containers");
      let containers;
      for(let i = 0; i < containersResponse.data.length; i++){
        containersResponse.data[i]['type'] = 'Container';
        containersResponse.data[i]['icon'] = 'grid';
        let label = `${containersResponse.data[i].lab.name}`;
        //console.log(`container ${i + 1}`, containersResponse.data[i].breadcrumbs);
        for(let j = 0; j < containersResponse.data[i].breadcrumbs.length; j++){
          label += ` / ${containersResponse.data[i].breadcrumbs[j].name}`;
        }
        containersResponse.data[i]['label'] = label;
      }
      containers = containersResponse.data;
      records = records.concat(containersResponse.data);

      let physicalsResponse = await Api.get("physicals");
      for(let i = 0; i < physicalsResponse.data.length; i++){
        physicalsResponse.data[i]['type'] = 'Physical';
        physicalsResponse.data[i]['icon'] = 'flask';
        physicalsResponse.data[i]['label'] = `${physicalsResponse.data[i].lab.name} / ${physicalsResponse.data[i].name}`;
      }
      const physicals = physicalsResponse.data;
      records = records.concat(physicalsResponse.data);

      let virtualsResponse = await Api.get("virtuals");
      for(let i = 0; i < virtualsResponse.data.length; i++){
        virtualsResponse.data[i]['type'] = 'Virtual';
        virtualsResponse.data[i]['icon'] = 'dna';
        virtualsResponse.data[i]['label'] = `${virtualsResponse.data[i].name}`;
      }
      const virtuals = virtualsResponse.data;
      records = records.concat(virtualsResponse.data);

      const result = {
        labs,
        containers,
        physicals,
        virtuals,
        records
      };

      return result;     
    } catch (error) {
      console.log('Search.getData', error);
    }
  }

  componentDidMount() {
    this.getData()
    .then((result) => {
      this.setState(result);
    })
    .catch((error) => {
      console.error('SearchBar.componentDidMount', error);
    });
  }

  render() {
    const recordsExist = this.state.records.length > 0; 
    return (
      <div className="SearchBar">
        <Suspense fallback="Loading...">
          <FadeIn>
            <Typeahead
              className="mt-3"
              labelKey={(option) => {
                // console.log('option.label', option)
                return option.label; 
              }}
              // labelKey="name"
              placeholder={recordsExist ? "<search here>" : "Loading Search Data..."}
              options={this.state.records}
            />
          </FadeIn>
        </Suspense>
      </div>
    );
  }
}

export default SearchBar;
