import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import styles from './Burger.module.css';

const burger = (props) => {
  let ingredientValues = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  }).reduce((arr, currentEl) => {
    return arr.concat(currentEl);
  }, []);

  if (ingredientValues.length === 0) {
    ingredientValues = <p>Please start to add ingredients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientValues}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;