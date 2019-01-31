import React, { Component, Suspense, lazy } from 'react';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));


class About extends Component {
  render() {
    return (
      <div className="About">
        <Suspense fallback="Loading...">
          <Container>
            <Row>
              <Column col="12" colSm="10" colMd="6" colLg="4">
                <Card icon="information" title="About" className="mt-3">
                  About Page
                </Card>
              </Column>  
            </Row>
          </Container>
        </Suspense>
      </div>
    );
  }
}

export default About;
