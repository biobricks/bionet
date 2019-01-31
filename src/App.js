import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.scss';
import { Navbar, NavbarLink, NavbarDropdown, NavbarDropdownLink, AppFooter } from './components/Bootstrap';
import logo from './images/bionet-logo.png';

import Landing from './components/pages/Landing';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.getData = this.getData.bind(this);
  }
  
  async getData() {
    try {
      
    } catch (error) {
      return {

      }
    }
  }

  componentDidMount() {
    this.getData()
    .then((result) => {

    })
    .catch((error) => {
      console.error('App.js.componentDidMount', error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="viewport-container">
          
          <Navbar brandImgSrc={logo} brandWidth="40">
            <NavbarDropdown label="Account" icon="account" id="account-dropdown">
              <NavbarDropdownLink to="/login" label="Login" icon="login-variant" />
              <NavbarDropdownLink to="/signup" label="Sign Up" icon="clipboard-account" />
            </NavbarDropdown>
            <NavbarLink to="/about">About</NavbarLink>
          </Navbar>
          
          <Switch>
            <Route exact path="/about" render={(props) => <About {...this.state} />} />
            <Route exact path="/login" render={(props) => <Login {...this.state} />} />
            <Route exact path="/signup" render={(props) => <Signup {...this.state} />} />
            <Route exact path="/profile" render={(props) => <Profile {...this.state} />} />
            <Route exact path="/" render={(props) => <Landing {...this.state} />} />
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
