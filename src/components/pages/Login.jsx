import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="login-variant" title="Login" className="mt-3">
                Login Page
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
