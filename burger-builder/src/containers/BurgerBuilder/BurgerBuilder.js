import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  meat: 1.3,
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  }

  setPurchasable = (ingredients) => {

    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, value) => {
      return sum + value;
    }, 0);

    this.setState({purchasable: sum > 0});
  };

  addIngredient = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount + 1;
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.setPurchasable(updatedIngredients);
  };

  removeIngredient = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    const currentCount = this.state.ingredients[type];

    if (currentCount <= 0) {
      return;
    }

    const updatedCount = currentCount - 1;
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.setPurchasable(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return(
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          removeMethod={this.removeIngredient}
          addMethod={this.addIngredient} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;