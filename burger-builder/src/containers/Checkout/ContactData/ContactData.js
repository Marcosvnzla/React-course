import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: ''
    }
  }

  render() {
    return(
      <div className={styles.ContactData}>
        <h4>Enter your contact info</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Street" />
          <Button btnType='Success'>Order Now!</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;