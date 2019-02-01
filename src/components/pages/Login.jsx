import React, { Component, Suspense, lazy } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import Api from '../../modules/Api';
import Auth from '../../modules/Auth';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
const Button = lazy(() => import('../bootstrap/components/Button'));
const Form = lazy(() => import('../bootstrap/forms/Form'));
const InputText = lazy(() => import('../bootstrap/forms/InputText'));
const InputPassword = lazy(() => import('../bootstrap/forms/InputPassword'));

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        username: "",
        password: ""
      },
      errors: {
        summary: null,
        username: null,
        password: null
      },
      instructions: {
        username: null,
        password: null
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }  

  onInputChange(e) {
    e.preventDefault();
    let form = this.state.form;
    let attribute = e.target.getAttribute('name');
    let newValue = e.target.value;
    form[attribute] = newValue;
    this.setState({form});
  }

  onFormSubmit(e) {
    e.preventDefault();
    const form = this.state.form;
    const username = form.username;
    const usernameValid = username && username.length > 4;
    const password = form.password; 
    const passwordValid = password && password.length > 6;
    const formValid = usernameValid && passwordValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.login(this.state.form)
      .then((result) => {
        this.props.debug && console.log('Login.onFormSubmit.Api.login.result', result);
        if (result.success) {
          Auth.authenticateUser(result.token);
          this.props.refresh();
          this.setState({ redirect: true });
        } else {
          form.username = "";
          form.password = "";
          errors.summary = result.message;
          errors.username = null;
          errors.password = null;
          instructions.username = null;
          instructions.password = null;
          this.setState({form, errors, instructions});
        }  
      });
    } else {
      if (!usernameValid) { errors.username = "You must provide a valid username." } else { instructions.username = "Username Valid" }
      if (!passwordValid) { errors.password = "You must provide a valid password." } else { instructions.password = "Password Valid" }
      this.setState({form, errors, instructions});
    }
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/" /> }
    return (
      <div className="Login">
        <Suspense fallback="Loading...">
          <FadeIn>
            <Container>
              <Row>
                <Column col="12" colSm="10" colMd="6" colLg="5" className="ml-auto mr-auto">
                  <Card icon="login-variant" title="Login" className="mt-3">
                    <Form 
                      onSubmit={this.onFormSubmit}
                    >
                      {this.state.errors.summary && (
                        <div className="form-group">
                          <p className="text-danger">{this.state.errors.summary}</p>
                        </div>
                      )}
                      <InputText 
                        label="Username"
                        attribute="username"
                        placeholder="username"
                        value={this.state.form.username}
                        onChange={this.onInputChange} 
                        instructions={this.state.instructions.username}
                        error={this.state.errors.username}
                      />
                      <InputPassword
                        label="Password"
                        attribute="password"
                        placeholder="password"
                        value={this.state.form.password}
                        onChange={this.onInputChange} 
                        instructions={this.state.instructions.password}
                        error={this.state.errors.password}
                      />
                      <Button
                        className="btn-block mt-3"
                        color="success"
                        submit
                      >
                        <i className="mdi text-lg mdi-login-variant mr-2" />Login
                      </Button>
                      <p className="mt-3 text-center">
                        <Link to="/password-reset">Forgot Password ?</Link>
                      </p>
                    </Form>
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

export default Login;
