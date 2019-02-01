import React, { Component, Suspense, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import Api from '../../modules/Api';

const Container = lazy(() => import('../bootstrap/grid/Container'));
const Row = lazy(() => import('../bootstrap/grid/Row'));
const Column = lazy(() => import('../bootstrap/grid/Column'));
const Card = lazy(() => import('../bootstrap/components/Card'));
const Button = lazy(() => import('../bootstrap/components/Button'));
const Form = lazy(() => import('../bootstrap/forms/Form'));
const InputText = lazy(() => import('../bootstrap/forms/InputText'));
const InputPassword = lazy(() => import('../bootstrap/forms/InputPassword'));

class PasswordResetVerify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      form: {
        resetToken: "",
        newPassword: "",
        passwordConfirm: ""
      },
      errors: {
        summary: null,
        resetToken: null,
        newPassword: null,
        passwordConfirm: null
      },
      instructions: {
        resetToken: null,
        newPassword: null,
        passwordConfirm: null
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
    const resetToken = form.resetToken;
    const resetTokenValid = resetToken && resetToken.length > 6;
    const newPassword = form.newPassword;
    const newPasswordValid = newPassword && newPassword.length > 6;
    const passwordConfirm = form.passwordConfirm;
    const passwordConfirmValid = passwordConfirm && passwordConfirm.length > 6 && passwordConfirm === newPassword;
    const formValid = resetTokenValid && newPasswordValid && passwordConfirmValid;
    let errors = this.state.errors;
    let instructions = this.state.instructions;
    if (formValid) {
      Api.postPublic('reset-password/validate', this.state.form)
      .then((result) => {
        this.props.debug && console.log('PasswordResetVerify.onFormSubmit.result', result);
        if (result.success) {
          this.setState({ redirect: true });
        } else {
          form.resetToken = "";
          form.newPassword = "";
          form.passwordConfirm = "";
          errors.summary = result.message;
          errors.resetToken = null;
          errors.newPassword = null;
          errors.passwordConfirm = null;
          instructions.resetToken = null;
          instructions.newPassword = null;
          instructions.passwordConfirm = null;
          this.setState({form, errors, instructions});
        }  
      });
    } else {
      if (!resetTokenValid) { errors.resetToken = "You must provide a valid reset token." } else { instructions.resetToken = "Reset Token Valid" }
      if (!newPasswordValid) { errors.newPassword = "You must provide a valid new password with more than 6 characters." } else { instructions.newPassword = "New Password Valid" }
      if (!passwordConfirmValid) { errors.passwordConfirm = "The password and confirm password do not match one another." } else { instructions.passwordConfirm = "Password Confirm Valid" }
      this.setState({form, errors, instructions});
    }
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/login" /> }
    return (
      <div className="PasswordResetVerify">
        <Suspense fallback="Loading...">
          <Container>
            <Row>
              <Column col="12" colSm="10" colMd="6" colLg="5" className="ml-auto mr-auto">
                <Card icon="lock-question" title="Verify Reset Password" className="mt-3">
                  <Form 
                    onSubmit={this.onFormSubmit}
                  >
                    {this.state.errors.summary && (
                      <div className="form-group">
                        <p className="text-danger">{this.state.errors.summary}</p>
                      </div>
                    )}

                    <p>Enter your verification code sent to you by email.</p>

                    <InputText 
                      label="Reset Token"
                      attribute="resetToken"
                      placeholder="your.reset.token"
                      value={this.state.form.resetToken}
                      onChange={this.onInputChange} 
                      instructions={this.state.instructions.resetToken}
                      error={this.state.errors.resetToken}
                    />

                    {this.state.form.resetToken && this.state.form.resetToken.length > 6 && (
                      <>

                        <InputPassword
                          label="New Password"
                          attribute="newPassword"
                          placeholder="myNewPassword"
                          value={this.state.form.newPassword}
                          onChange={this.onInputChange} 
                          instructions={this.state.instructions.newPassword}
                          error={this.state.errors.newPassword}
                        />
                        <InputPassword
                          label="Confirm Password"
                          attribute="passwordConfirm"
                          placeholder="password (again)"
                          value={this.state.form.passwordConfirm}
                          onChange={this.onInputChange} 
                          instructions={this.state.instructions.passwordConfirm}
                          error={this.state.errors.passwordConfirm}
                        />

                        <Button
                          className="btn-block mt-3"
                          color="success"
                          submit
                        >
                          <i className="mdi text-lg mdi-lock-question mr-2" />Submit
                        </Button>
                      </>
                    )}  
                  </Form>
                </Card>
              </Column>  
            </Row>
          </Container>
        </Suspense>
      </div>
    );
  }

}

export default PasswordResetVerify;
