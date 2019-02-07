import React, { Component, lazy } from 'react'; 
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import DataPanel from '../panels/DataPanel';
import SearchBar from '../SearchBar';


const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
//const SearchBar = lazy(() => import('../SearchBar'));
//const DataPanel = lazy(() => import('../DataPanel'));

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedRecord = this.props.selectedRecord;
    const selectedRecordExists = selectedRecord && Object.keys(selectedRecord).length > 0;
    return (
      <div className="Landing">
          <FadeIn>
            <SearchBar {...this.props} />
            <Container className="pb-3">
              <Row>

                {/* Left Panel */}
                <Column col="12" colLg="7">
                  { !selectedRecordExists ? (
                    <Card icon="home" title="Home" className="mt-3">
                      {this.props.isLoggedIn ? (
                        <p className="card-text">Welcome to Bionet <strong className="text-capitalize">{this.props.currentUser.username}</strong>.</p>
                      ) : (
                        <>
                          <p className="card-text">Welcome to Bionet.</p>
                          <Link className="card-link" to="/login">Login</Link>
                          <Link className="card-link" to="/signup">Sign Up</Link>
                        </>
                      )}
                    </Card> 
                  ) : (
                    <>  
                      {selectedRecord && (
                        <DataPanel {...this.props} />
                      )} 
                    </>
                  )}    
                </Column>  
                {/* Right Panel */}
                {/* Grid Card Here */}
              </Row>
            </Container>
          </FadeIn>
      </div>
    );
  }
}

export default Landing;
