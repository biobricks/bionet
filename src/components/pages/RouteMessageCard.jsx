import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';

class RouteMessageCard extends Component {

  render() {
    return (
      <div className="RouteMessageCard">
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
      </div>
    );
  }

}

export default RouteMessageCard;
