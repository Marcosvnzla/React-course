import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientsList = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey + Math.random()}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
  });

  return (
    <Fragment>
      <h1>Your Order!</h1>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientsList}
      </ul>
      <p>Total: ${props.total.toFixed(2)}</p>
      <Button clicked={props.btnCancel} btnType='Danger'>Cancel</Button>
      <Button clicked={props.btnSuccess} btnType='Success'>Continue!</Button>
    </Fragment>
  );
};

export default orderSummary;