import React, { Component, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Page from './pages/Page';
import RouteMessageCard from './pages/RouteMessageCard';

const Landing = lazy(() => import('./pages/Landing'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));

class Router extends Component {
  render () {
    return (
      <div className="Router">
        <Switch>
          <Route exact path="/about" render={(props) => <Page {...props} {...this.props} PageComponent={About} /> } />
          <Route exact path="/login" render={(props) => <Page {...props} {...this.props} PageComponent={Login}/> } />
          <Route exact path="/signup" render={(props) => <Page {...props} {...this.props} PageComponent={Signup} /> } />
          <Route exact path="/profile" render={(props) => <Page {...props} {...this.props} PageComponent={Profile} /> } />
          <Route exact path="/" render={(props) => <Page {...props} {...this.props} PageComponent={Landing} /> } />
          <Route 
            render={(props) => (
              <RouteMessageCard
                icon="alert-circle"
                title="404 - Not Found"
                subtitle="Page Not Found"
                message="The content you have requested could not be found.  Please check the link and try again."
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Router;