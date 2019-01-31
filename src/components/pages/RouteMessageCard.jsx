import React, { Component, Suspense, lazy } from 'react';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));

class RouteMessageCard extends Component {

  render() {
    return (
      <div className="RouteMessageCard">
        <Suspense fallback="Loading...">
          <Container>
            <Row>
              <Column col="12" colSm="10" colMd="6" colLg="5" className="ml-auto mr-auto">
                <Card icon={this.props.icon} title={this.props.title} className="mt-3">
                  {this.props.subtitle && (
                    <h4>{this.props.subtitle}</h4>
                  )}
                  {this.props.message && (
                    <p>{this.props.message}</p>
                  )}  
                </Card>
              </Column>  
            </Row>
          </Container>
        </Suspense>
      </div>
    );
  }

}

export default RouteMessageCard;
