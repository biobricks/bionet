import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { Container, Row, Column, Card, Navbar, NavbarLink, NavbarDropdown, NavbarDropdownLink } from './components/Bootstrap';
import logo from './images/bionet-logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="viewport-container">
          
          <Navbar brandImgSrc={logo} brandWidth="40">
            <NavbarLink to="/about">About</NavbarLink>
            <NavbarDropdown label="Account" icon="account" id="account-dropdown">
              <NavbarDropdownLink to="/about" label="About" icon="information" />
            </NavbarDropdown>
          </Navbar>
          
          <Switch>
            <Route exact path="/about" render={(props) => (<div>About Page</div>)} />
            <Route exact path="/login" render={(props) => (<div>Login Page</div>)} />
            <Route exact path="/signup" render={(props) => (<div>Signup Page</div>)} />
            <Route exact path="/profile" render={(props) => (<div>User Profile Page</div>)} />
            <Route exact path="/" render={(props) => (
              <Container>
                <Row>
                  <Column col="12" colSm="10" colMd="6" colLg="4">
                    <Card icon="home" title="Home" className="mt-3">
                      Landing Page
                    </Card>
                  </Column>  
                </Row>
              </Container>
            )} />
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
