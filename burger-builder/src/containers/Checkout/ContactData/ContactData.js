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
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          name: 'street',
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loadingOrder: false
  }

  inputChanged = (event, elementId) => {
    const updatedForm = {
      ...this.state.formData
    };
    const updatedFormElement = {
      ...updatedForm[elementId]
    };
    updatedFormElement.value = event.target.value;
    updatedForm[elementId] = updatedFormElement;
    this.setState({formData: updatedForm});
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
      return <Input changed={(event) => this.inputChanged(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.value} />
    });

    let form = (
      <form>
        {formElementList}
        <Button btnType='Success' clicked={this.sendOrder} >Order Now!</Button>
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