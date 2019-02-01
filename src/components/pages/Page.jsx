import React, { Component, Suspense } from 'react';
import FadeIn from 'react-fade-in';
import RouteBoundary from './RouteBoundary';
import RouteMessageCard from './RouteMessageCard';

class Page extends Component {
  render () {
    const PageComponent = this.props.PageComponent;
    return (
      <RouteBoundary>
        <Suspense fallback={<FadeIn><RouteMessageCard icon="timer-sand" title="Page Loading" message="Please be patient while the content loads..." /></FadeIn>}>
          <FadeIn><PageComponent {...this.props} /></FadeIn>
        </Suspense>
      </RouteBoundary>
    );
  }
}

export default Page;