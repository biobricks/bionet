import React, { Component, Suspense } from 'react';
import RouteBoundary from './RouteBoundary';
import RouteMessageCard from './RouteMessageCard';

class Page extends Component {
  render () {
    const PageComponent = this.props.PageComponent;
    return (
      <RouteBoundary>
        <Suspense fallback={<RouteMessageCard icon="timer-sand" title="Page Loading" message="Please be patient while the content loads..." />}>
          <PageComponent {...this.props} />
        </Suspense>
      </RouteBoundary>
    );
  }
}

export default Page;