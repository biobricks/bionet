import React, { Component, Suspense, lazy } from 'react';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <Suspense fallback="Loading...">
          <Container>
            <Row>
              <Column col="12" colSm="10" colMd="6" colLg="4">
                <Card icon="account" title="Profile" className="mt-3">
                  Profile Page
                </Card>
              </Column>  
            </Row>
          </Container>
        </Suspense>
      </div>
    );
  }
}

export default Profile;
