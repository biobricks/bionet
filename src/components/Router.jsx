import React, { Component, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Navigation from './Navigation';
import Page from './pages/Page';
import RouteMessageCard from './pages/RouteMessageCard';

const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const PasswordResetVerify = lazy(() => import('./pages/PasswordResetVerify'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Landing = lazy(() => import('./pages/Landing'));

class Router extends Component {
  render () {
    this.props.debug && console.log('Router.props', this.props);
    return (
      <div className="Router">
        <Navigation {...this.props} />
        <Switch>
          <Route exact path="/password-reset/verify" render={(props) => <Page {...props} {...this.props} PageComponent={PasswordResetVerify} /> } />
          <Route exact path="/password-reset" render={(props) => <Page {...props} {...this.props} PageComponent={PasswordReset} /> } />
          <Route exact path="/about" render={(props) => <Page {...props} {...this.props} PageComponent={About} /> } />
          <Route exact path="/login" render={(props) => <Page {...props} {...this.props} PageComponent={Login}/> } />
          <Route exact path="/signup" render={(props) => <Page {...props} {...this.props} PageComponent={Signup} /> } />
          <Route exact path="/profile" render={(props) => <Page {...props} {...this.props} PageComponent={Profile} /> } />
          <Route exact path="/" render={(props) => <Page {...props} {...this.props} PageComponent={Landing} /> } />
          {/* <Route 
            render={(props) => (
              <RouteMessageCard
                icon="alert-circle"
                title="404 - Not Found"
                subtitle="Page Not Found"
                message="The content you have requested could not be found.  Please check the link and try again."
              />
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);