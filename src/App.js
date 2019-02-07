import React, { Component } from 'react';
import './App.scss';
import Router from './components/Router';
import Footer from './components/Footer';
import Api from './modules/Api';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      debug: true,
      isLoggedIn: false,
      currentUser: {},
      action: 'view',
      selectedRecord: null
    };
    this.setAction = this.setAction.bind(this);
    this.setSelectedRecord = this.setSelectedRecord.bind(this);
    this.refreshCurrentUser = this.refreshCurrentUser.bind(this);
    this.getData = this.getData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);
  }  

  setAction(action) {
    console.log('set action called', action);
    this.setState({action});
  }

  setSelectedRecord(action, selectedRecord) {
    this.state.debug && console.log('App.selectedRecord', selectedRecord);
    this.setState({action, selectedRecord});
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
    console.log('App.state', this.state);
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
            setSelectedRecord={this.setSelectedRecord} 
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
