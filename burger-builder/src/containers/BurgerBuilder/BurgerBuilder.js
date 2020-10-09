import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchasable: false,
    showModal: false
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

  showModal = () => {
    this.setState({showModal: true});
  };

  cancelOrder = () => {
    this.setState({showModal: false});
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
        <Modal show={this.state.showModal} hideBackdrop={this.cancelOrder}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          orderClicked={this.showModal}
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