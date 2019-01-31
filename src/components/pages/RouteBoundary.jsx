import React, { Component } from 'react';
import Container from '../bootstrap/grid/Container';
import Row from '../bootstrap/grid/Row';
import Column from '../bootstrap/grid/Column';
import Card from '../bootstrap/components/Card';

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
        </div>
      );
    }
    return this.props.children; 
  }

}

export default RouteBoundary;
