import React, { Component } from 'react';
import axios from 'axios';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    customer: {
      name: '',
      email: '',
      address: {
        street: ''
      }
    },
    loadingOrder: false
  }

  sendOrder = (event) => {
    this.setState({loadingOrder: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'userName',
        address: {
          street: 'userStreet',
          zipCode: '1234',
          additionalInfo: 'addtitionalInfo'
        },
        email: 'username@test.com'
      },
      paymentMethod: 'credit'
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
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
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