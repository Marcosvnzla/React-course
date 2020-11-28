import React, { Component } from 'react';
import axios from 'axios';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        value: '',
        valid: true
      }
    },
    formIsValid: false,
    loadingOrder: false
  }

  checkValidity = (value, rules, elementId) => {
    let isValid = true;

    if (elementId === 'deliveryMethod') {
      return;
    }
    
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
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, elementId);
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
    this.setState({loadingOrder: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };

    axios.post('/orders.json', order)
    .then(response => {
      console.log(response);
      this.setState({loadingOrder: false});
      this.props.history.push('/');
    })
    .catch(error => {
      alert('Something went wrong :( please try again');
      this.setState({loadingOrder: false});
    });

    event.preventDefault();
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
    if (this.state.loadingOrder) {
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

export default ContactData;