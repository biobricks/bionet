import React, { Component } from 'react';
import './App.scss';
import Router from './components/Router';
import Footer from './components/Footer';
import Api from './modules/Api';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      debug: false,
      isLoggedIn: false,
      currentUser: {},
      action: 'view',
      view: 'Grid',
      selectedRecord: null
    };
    this.setAction = this.setAction.bind(this);
    this.setView = this.setView.bind(this);
    this.setSelectedRecord = this.setSelectedRecord.bind(this);
    this.refreshCurrentUser = this.refreshCurrentUser.bind(this);
    this.getData = this.getData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);
  }  

  setAction(action) {
    this.setState({action});
  }

  setView(view) {
    console.log('set view called', view);
    this.setState({view});
  }

  setSelectedRecord(action, selectedRecord) {
    this.state.debug && console.log('App.selectedRecord', selectedRecord);
    Api.get(`${selectedRecord.endpoint}/${selectedRecord._id}`)
    .then((res) => {
      selectedRecord = res.data || selectedRecord;
      console.log('res', selectedRecord)
      this.setState({action, selectedRecord});
    })
    .catch((error) => {
      throw error;
    });
  }

  async refreshCurrentUser() {
    try {
      let state = this.state;
      state.currentUser = await Api.getCurrentUser();
      state.isLoggedIn = Object.keys(state.currentUser).length > 0;
      if (this.state.debug) {
        console.log('App.refreshCurrentUser.state.currentUser', state.currentUser);
        console.log('App.refreshCurrentUser.state.isLoggedIn', state.isLoggedIn);
      }
      return state;
    } catch (error) {
      throw error;
    }    
  }

  async getData() {
    try {
      let state = await this.refreshCurrentUser();
      return state;
    } catch (error) {
      throw error;
    }
  }

  refresh() {
    this.getData()
    .then((result) => {
      this.setState(result);
    })
    .catch((error) => {
      console.error('App.js.componentDidMount', error);
    });
  }

  logout() {
    Api.logoutCurrentUser()
    .then(() => {
      this.refresh();
    });    
  }

  componentDidMount() {
    this.state.debug && console.log('App.state', this.state);
    this.refresh();
  }

  render() {
    return (
      <div className="App">
        <div className="viewport-container">
          <Router 
            {...this.state} 
            refresh={this.refresh}
            isLoggedIn={this.state.isLoggedIn} 
            logout={this.logout}
            setAction={this.setAction}
            setView={this.setView}
            setSelectedRecord={this.setSelectedRecord} 
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
