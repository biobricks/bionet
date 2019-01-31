import React, { Component, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

const AppFooter = lazy(() => import('./bootstrap/components/AppFooter'));

class Footer extends Component {
  render () {
    return (
      <Suspense fallback="Loading...">
        <AppFooter className="Footer text-center">
          <Link to="/about">Learn more</Link> about the bionet.
        </AppFooter>
      </Suspense>
    );
  }
}

export default Footer;