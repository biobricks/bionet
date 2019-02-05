import React, { Component, Suspense, lazy } from 'react'; 
import FadeIn from 'react-fade-in';
import Api from '../../modules/Api';
import SearchBar from '../SearchBar';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
//const SearchBar = lazy(() => import('../SearchBar'));

class LabProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endpoint: '',
      id: '',
      selectedRecord: null
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    try {  
      const { pathname } = this.props.location;
      const pathnameArray = pathname.split('/');
      const id = pathnameArray[2];
      console.log('getData.id', id);
      const res = await Api.get(`labs/${id}`);
      console.log('getData.res.success', res.success);
  
      if (res.success === true) {
        const selectedRecord = res.data;
        this.props.debug && console.log('Api.get.res', selectedRecord);
        this.setState({ selectedRecord });
      } else {
        console.log('fail', res)
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('Models Updated');
    //const { pathname } = this.props.location;
    //const pathnameArray = pathname.split('/');
    // console.log('prevProps: ', prevProps);
    // console.log('prevState: ', prevState);
    // console.log('Models: ', pathnameArray);
  }

  componentDidMount() {
    try {
      console.log('Models Mounted');
      this.getData()
      .then(res => {
        this.props.debug && console.log('Models.getData.res', res);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  render() {
    return (
      <div className="Models">
        <Suspense fallback="Loading...">
          <FadeIn>
            <SearchBar {...this.props} />
            <Container>
              <Row>
                <Column col="12" colLg="7">
                  <Card icon="home" title="Models" className="mt-3">
                    {/* {JSON.stringify(getParams(this.props.location.pathname), null, 2)} */}
                    {this.props.location.pathname}
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

export default LabProfile;
