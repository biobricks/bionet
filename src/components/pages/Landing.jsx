import React, { Component, Suspense, lazy } from 'react'; 
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
// const NavCard = lazy(() => import('../bootstrap/components/NavCard'));
const SearchBar = lazy(() => import('../SearchBar'));

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedRecord = this.props.selectedRecord;
    const action = this.props.action;
    return (
      <div className="Landing">
        <Suspense fallback="Loading...">
          <FadeIn>
            <SearchBar {...this.props} />
            <Container className="pb-3">
              <Row>
                <Column col="12" colLg="7">
                  <Card icon="home" title="Home" className="mt-3">
                    {this.props.isLoggedIn ? (
                      <>
                        <p className="card-text">Welcome to Bionet <strong className="text-capitalize">{this.props.currentUser.username}</strong>.</p>
                      </>
                    ) : (
                      <>
                        <p className="card-text">Welcome to Bionet.</p>
                        <Link className="card-link" to="/login">Login</Link>
                        <Link className="card-link" to="/signup">Sign Up</Link>
                      </>
                    )}
                  </Card> 
                  {selectedRecord && (
                    <>
                      {(action === 'view') && (
                        <div className="card mt-3">
                          <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="navbar-brand">
                              <i className={`mdi mdi-${selectedRecord.icon} mr-2`} />{selectedRecord.name}
                            </div>
                            <div className="card-body">
                          
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )} 
                </Column>  
              </Row>
            </Container>
          </FadeIn>
        </Suspense>
      </div>
    );
  }
}

export default Landing;
