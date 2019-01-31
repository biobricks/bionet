import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.scss';
import { Navbar, NavbarLink, NavbarDropdown, NavbarDropdownLink, AppFooter } from './components/Bootstrap';
import logo from './images/bionet-logo.png';
import Api from './modules/Api';

import Landing from './components/pages/Landing';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      debug: true,
      isLoggedIn: false,
      currentUser: {}
    };
    this.refreshCurrentUser = this.refreshCurrentUser.bind(this);
    this.getData = this.getData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);
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
    this.refresh();
  }

  render() {
    return (
      <div className="App">
        <div className="viewport-container">
          
          <Navbar brandImgSrc={logo} brandWidth="40">
            { this.state.isLoggedIn ? (
              <>
                <NavbarDropdown label="Account" icon="account" id="account-dropdown">
                  <NavbarDropdownLink to="/profile" label="Profile" icon="account" />
                  <button className="dropdown-item" onClick={this.logout}>
                    <i className="mdi mdi-logout-variant mr-1" />Logout
                  </button>
                </NavbarDropdown>
              </>
            ) : (
              <>
               <NavbarLink to="/login">
                <i className="mdi mdi-login-variant mr-1" />Login
               </NavbarLink> 
               <NavbarLink to="/signup">
                <i className="mdi mdi-account-plus mr-1" />Sign Up
               </NavbarLink> 
              </>
            )}
            <NavbarLink to="/about">About</NavbarLink>
          </Navbar>
          
          <Switch>
            <Route exact path="/about" render={(props) => <About {...this.state} />} />
            <Route exact path="/login" render={(props) => (
              <Login 
                {...props} 
                {...this.state}
                refresh={this.refresh}
              />
            )}/>
            <Route exact path="/signup" render={(props) => (
              <Signup 
                {...props} 
                {...this.state}
              />
            )}/>
            <Route exact path="/profile" render={(props) => <Profile {...this.state} />} />
            <Route exact path="/" render={(props) => (
              <Landing 
                {...props} 
                {...this.state}
              />
            )}/>
          </Switch>

        </div>

        <AppFooter className="text-center">
          <Link to="/about">Learn more</Link> about the bionet.
        </AppFooter>
        
      </div>
    );
  }
}

export default App;
