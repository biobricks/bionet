import React, { Component, Suspense } from 'react'; 
import Api from '../modules/Api';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import './SearchBar.scss';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      include: {
        labs: true,
        containers: true,
        virtuals: false,
        physicals: false
      },
      labs: [],
      containers: [],
      physicals: [],
      virtuals: [],
      records: [],
      selectedRecord: {}
    };
    this.getAllModel = this.getAllModel.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  async getAllModel(namePlural) {
    try {
      let records = this.state.records;
      const res = await Api.get(namePlural);
      const success = Object.keys(res).indexOf('data') > -1;
      const data = success ? res.data : [];
      records = records.concat(data);
      if (this.props.debug) { console.log(`Search | ${namePlural}: ${data.length} | records: ${records.length}`) }
      let newState = { records };
      newState[`${namePlural}`] = data;
      this.setState(newState);
    } catch (error) {
      console.error(error);
    }
  }

  async getData() {
    try {  
      const attrs = Object.keys(this.state.include);
      for(let i = 0; i < attrs.length; i++){
        const attr = attrs[i];
        const isIncluded = this.state.include[attr];
        isIncluded && await this.getAllModel(attr);
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getData()
    .then((result) => {
      this.setState({ isLoading: false });
    })
    .catch((error) => {
      console.error('SearchBar.componentDidMount', error);
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <Suspense fallback="Loading..."> 
          <div className="input-group mt-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="mdi mdi-magnify mr-2" />Search
              </span>
            </div>
            <Typeahead
              className=""
              bsSize="large"
              isLoading={this.state.isLoading}
              labelKey={(option) => {
                let breadcrumbString = "";
                for(let i = 0; i < option.breadcrumbs.length; i++){
                  let breadcrumb = option.breadcrumbs[i];
                  breadcrumbString += ` ${breadcrumb.name} `;
                  if (i !== (option.breadcrumbs.length - 1)) { 
                    breadcrumbString += ` > `;
                  }
                }
                return breadcrumbString;
              }}
              // labelKey="name"
              placeholder={this.state.isLoading ? "Loading..." : "<search here>"}
              options={this.state.records}
            />
          </div>
        </Suspense>
      </div>
    );
  }
}

export default SearchBar;
