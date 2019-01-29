import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="home" title="Home" className="mt-3">
                Landing Page
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default Landing;
