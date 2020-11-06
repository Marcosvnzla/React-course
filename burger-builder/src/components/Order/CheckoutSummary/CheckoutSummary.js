import React from 'react';
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return(
    <div>
      <h1>We hope you like it!</h1>
      <div className={styles.burgerContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.onCancel} btnType="Danger">Cancel</Button>
      <Button clicked={props.onContinue} btnType="Success">Continue</Button>
    </div>
  );
}

export default CheckoutSummary;