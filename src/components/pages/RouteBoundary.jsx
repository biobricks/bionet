import React, { Component, Suspense, lazy } from 'react';
import FadeIn from 'react-fade-in';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));

class RouteBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="RouteBoundary">
          <Suspense fallback="Loading...">
            <FadeIn>
              <Container>
                <Row>
                  <Column col="12" colSm="10" colMd="6" colLg="5" className="ml-auto mr-auto">
                    <Card icon="alert-circle" title="Error" className="mt-3">
                      <h4>Oops, something went wrong :(</h4>
                      <p>{this.state.error.toString()}</p>
                    </Card>
                  </Column>
                </Row>
              </Container>
            </FadeIn>   
          </Suspense>     
        </div>
      );
    }
    return this.props.children; 
  }

}

export default RouteBoundary;
