import React, { Fragment } from 'react';

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
      <button>Continue to checkout?</button>
    </Fragment>
  );
};

export default orderSummary;