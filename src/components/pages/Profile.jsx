import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="account" title="Profile" className="mt-3">
                Profile Page
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
