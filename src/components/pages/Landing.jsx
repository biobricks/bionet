import React, { Component } from 'react';
import { Container, Row, Column, Card } from '../Bootstrap';
import Api from '../../modules/Api';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getData = this.getData.bind(this);
  }
  
  async getData() {
    try {
      const res = await Api.get('');
      if (this.props.debug) {
        console.log('Landing.getData.res', res);
      }  
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getData()
    .then((result) => {
      this.setState(result);
    })
    .catch((error) => {
      console.error('Landing.componentDidMount', error);
    });
  }

  render() {
    return (
      <div className="Landing">
        <Container>
          <Row>
            <Column col="12" colSm="10" colMd="6" colLg="4">
              <Card icon="home" title="Home" className="mt-3">
                <pre>Landing.props: {JSON.stringify(this.props, null, 2)}</pre>
                <pre>Landing.state: {JSON.stringify(this.state, null, 2)}</pre>
              </Card>
            </Column>  
          </Row>
        </Container>
      </div>
    );
  }
}

export default Landing;
