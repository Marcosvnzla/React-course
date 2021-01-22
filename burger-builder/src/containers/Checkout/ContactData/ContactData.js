import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { purchaseBurgerStart } from '../../../store/actions';

class ContactData extends Component {
  state = {
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          name: 'name',
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          name: 'street',
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loadingOrder: false
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

    return isValid;
  }

  inputChanged = (event, elementId) => {
    const updatedForm = {
      ...this.state.formData
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

    console.log(formIsValid);
    this.setState({formData: updatedForm, formIsValid: formIsValid});
  }

  sendOrder = (event) => {
    event.preventDefault();

    const order = {
      ingredients: this.props.ings,
      price: this.props.totPrice,
      formData: this.state.formData
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  render() {
    const formArray = [];
    for (let key in this.state.formData) {
      formArray.push({
        id: key,
        config: this.state.formData[key]
      });
    }

    const formElementList = formArray.map(formElement => {
      return <Input invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched} changed={(event) => this.inputChanged(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.value} />
    });

    let form = (
      <form>
        {formElementList}
        <Button disabled={!this.state.formIsValid} btnType='Success' clicked={this.sendOrder} >Order Now!</Button>
      </form>
    );      
    if (this.props.loading) {
      form = <Spinner />
    }

    return(
      <div className={styles.ContactData}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totPrice: state.totalPrice,
    loading: state.orderLoading,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurgerStart(orderData, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);