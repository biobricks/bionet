import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class About extends Component {
  render() {
    return (
      <div className="About">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="information" title="About" className="mt-3">
                About Page
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
