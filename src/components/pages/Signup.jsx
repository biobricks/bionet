import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class Signup extends Component {
  render() {
    return (
      <div className="Signup">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="clipboard-account" title="Signup" className="mt-3">
                Signup Page
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default Signup;
