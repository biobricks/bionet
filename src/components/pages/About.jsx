import React, { Component, Suspense, lazy } from 'react';
import FadeIn from 'react-fade-in';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));


class About extends Component {
  render() {
    return (
      <div className="About">
        <Suspense fallback="Loading...">
          <FadeIn>
            <Container>
              <Row>
                <Column col="12" colLg="5" className="ml-auto mr-auto">
                  <Card title="Bionet" className="mt-3 mb-3 text-center">
                    <h4>Open Source Biological Inventory Management</h4>
                    <p>Welcome to BioNet. Keep track of your stuff, find what you need, and share as you like. The BioNet supports searching for biological material across multiple labs — all your inventory information is controlled locally by you. You decide if others can see what you wish to share. All BioNet software and associated materials are open source and free to use.</p>
                  </Card>
                </Column>  
              </Row>
            </Container>
          </FadeIn>  
        </Suspense>
      </div>
    );
  }
}

export default About;
