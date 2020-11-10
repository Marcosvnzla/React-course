import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key]
    });
  }
  const ingredientsOutput = ingredients.map(ig => {
    return <span className={styles.ingredient} key={ig.name + Math.random}>{ig.name} {ig.amount} </span>
  });

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;