import React, { Component, Suspense, lazy } from 'react';
import FadeIn from 'react-fade-in';
import { Redirect } from 'react-router-dom';
import Api from '../../modules/Api';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
const Button = lazy(() => import('../bootstrap/components/Button'));
const Form = lazy(() => import('../bootstrap/forms/Form'));
const InputText = lazy(() => import('../bootstrap/forms/InputText'));

class PasswordReset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        email: ""
      },
      errors: {
        summary: null,
        email: null
      },
      instructions: {
        email: null
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
    const email = form.email;
    const emailValid = email && email.length > 9;
    const formValid = emailValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.postPublic('reset-password', this.state.form)
      .then((result) => {
        this.props.debug && console.log('PasswordReset.onFormSubmit.result', result);
        if (result.success) {
          this.setState({ redirect: true });
        } else {
          form.email = "";
          errors.summary = result.message;
          errors.email = null;
          instructions.email = null;
          this.setState({form, errors, instructions});
        }  
      });
    } else {
      if (!emailValid) { errors.email = "You must provide a valid email." } else { instructions.email = "Email Valid" }
      this.setState({form, errors, instructions});
    }
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/password-reset/verify" /> }
    return (
      <div className="PasswordReset">
        <Suspense fallback="Loading...">
          <FadeIn>
            <Container>
              <Row>
                <Column col="12" colSm="10" colMd="6" colLg="5" className="ml-auto mr-auto">
                  <Card icon="lock-reset" title="Reset Password" className="mt-3">
                    <Form 
                      onSubmit={this.onFormSubmit}
                    >
                      {this.state.errors.summary && (
                        <div className="form-group">
                          <p className="text-danger">{this.state.errors.summary}</p>
                        </div>
                      )}

                      <p>Enter your email associated with your account and you will be sent instructions on how to reset your password.</p>

                      <InputText 
                        label="Email"
                        attribute="email"
                        placeholder="your.account.email@example.com"
                        value={this.state.form.email}
                        onChange={this.onInputChange} 
                        instructions={this.state.instructions.email}
                        error={this.state.errors.email}
                      />
                      <Button
                        className="btn-block mt-3"
                        color="success"
                        submit
                      >
                        <i className="mdi text-lg mdi-lock-reset mr-2" />Submit
                      </Button>
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

export default PasswordReset;
