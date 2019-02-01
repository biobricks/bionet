import React, { Component, Suspense, lazy } from 'react'; 
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import Api from '../../modules/Api';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
const SearchBar = lazy(() => import('../SearchBar'));

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
        <Suspense fallback="Loading...">
          <FadeIn>
            <Container>
              <Row>
                <Column col="12" colLg="7">
                  <SearchBar {...this.props} />
                  <Card icon="home" title="Home" className="mt-3">
                    {this.props.isLoggedIn ? (
                      <>
                        <p className="card-text">Welcome to Bionet <strong className="text-capitalize">{this.props.currentUser.username}</strong>.</p>
                      </>
                    ) : (
                      <>
                        <p className="card-text">Welcome to Bionet. {this.props.currentUser.username}</p>
                        <Link className="card-link" to="/login">Login</Link>
                        <Link className="card-link" to="/signup">Sign Up</Link>
                      </>
                    )}
                  </Card>  
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
