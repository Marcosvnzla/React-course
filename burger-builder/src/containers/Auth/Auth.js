import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignedUp: false
  }

  checkValidity = (value, rules, elementId) => {
    let isValid = true;
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChanged = (event, elementId) => {
    const updatedForm = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedForm[elementId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[elementId] = updatedFormElement;

    let formIsValid = true;
    for (let elementId in updatedForm) {
      formIsValid = updatedForm[elementId].valid && formIsValid;
    }

    this.setState({controls: updatedForm, formIsValid: formIsValid});
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp);
  }

  switchAuthMethod = () => {
    this.setState(prevState => {
      return {isSignedUp: !prevState.isSignedUp}
    })
  }

  render() {
    const formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const formElementList = formArray.map(formElement => {
      return <Input invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched} changed={(event) => this.inputChanged(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.value} />
    });

    const form = (
      <div className={styles.Auth}>
        <form onSubmit={this.submitForm}>
          {formElementList}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthMethod} btnType="Danger">Switch to {this.state.isSignedUp ? 'signin' : 'signup'}</Button>
      </div>
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <Fragment>
        {errorMessage}
        {this.props.loading ? <Spinner /> : form}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authLoading,
    error: state.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) => {dispatch(actions.auth(email, password, isSignedUp))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);