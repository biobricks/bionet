import React, { Component, Suspense, lazy } from 'react'; 
import shortid from 'shortid';
import Api from '../modules/Api';
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import './SearchBar.scss';

const Container = lazy(() => import('./bootstrap/grid/Container'));
const Row = lazy(() => import('./bootstrap/grid/Row'));
const Column = lazy(() => import('./bootstrap/grid/Column'));

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      include: {
        labs: true,
        containers: true,
        virtuals: true,
        physicals: true
      },
      labs: [],
      containers: [],
      physicals: [],
      virtuals: [],
      records: [],
      selectedRecord: {}
    };
    this.onSelectRecord = this.onSelectRecord.bind(this);
    this.getAllModel = this.getAllModel.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  onSelectRecord(record) {
    this.props.setSelectedRecord('view', record);
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
          <Container>
            <Row>
              <Column col="12" colLg="7">     
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-dark text-light">
                      <i className="mdi mdi-magnify mr-1" />Search
                    </span>
                  </div>
                  <Typeahead
                    className=""
                    //bsSize="large"
                    isLoading={this.state.isLoading}
                    labelKey="name"
                    placeholder={this.state.isLoading ? "Loading..." : "Labs, Containers, Virtual & Physical Samples..."}
                    options={this.state.records}
                    onChange={(selected) => {
                      this.onSelectRecord(selected[0]);  
                    }}
                    renderMenu={(results, menuProps) => {
                      const searchResults = results.map((result, index) => {
                        let bcrumbs = result.breadcrumbs || [];
                        const resultBreadcrumbs = bcrumbs.map((crumb, crumbIndex) => {
                          const isActive = crumbIndex === result.breadcrumbs.length - 1;
                          return (
                            <li key={shortid.generate()} className={`breadcrumb-item ${isActive ? 'active' : 'inactive'}`}>
                              <i className={`mdi mdi-${crumb.icon} ml-1`}/>{crumb.name}
                            </li>
                          );
                        });
                        return (
                          <MenuItem 
                            key={shortid.generate()}  
                            option={result} 
                            position={index}
                          >
                            <nav aria-label="breadcrumb">
                              <ol className="breadcrumb">
                                {resultBreadcrumbs}
                              </ol>
                            </nav>
                          </MenuItem>                      
                        );
                      });                
                      return (
                        <Menu {...menuProps}>
                          {searchResults}
                        </Menu>
                      );
                    }}
                  />
                </div>
              </Column>
            </Row>
          </Container>      
        </Suspense>
      </div>
    );
  }
}

export default SearchBar;
