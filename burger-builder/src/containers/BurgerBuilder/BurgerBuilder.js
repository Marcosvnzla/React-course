import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import withError from '../../hoc/withError/withError';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    showModal: false
  }

  componentDidMount () {
    this.props.onInitiIngredients();
  }

  setPurchasable = (ingredients) => {

    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, value) => {
      return sum + value;
    }, 0);

    return sum > 0;
  };

  showModal = () => {
    this.setState({showModal: true});
  };

  cancelOrder = () => {
    this.setState({showModal: false});
  };

  continueOrder = () => {
    this.props.onPurchaseBegin();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;


    let burger =this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            orderClicked={this.showModal}
            purchasable={this.setPurchasable(this.props.ings)}
            price={this.props.totPrice}
            disabled={disabledInfo}
            removeMethod={this.props.onIngredientRemove}
            addMethod={this.props.onIngredientAdd}
          />
        </Fragment>
      );

      orderSummary = <OrderSummary 
                          total={this.props.totPrice}
                          btnCancel={this.cancelOrder} 
                          btnSuccess={this.continueOrder} 
                          ingredients={this.props.ings} 
                        />;
    }

    return(
      <Fragment>
        <Modal show={this.state.showModal} hideBackdrop={this.cancelOrder}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingredientName) => {dispatch(actions.addIngredient(ingredientName))},
    onIngredientRemove: (ingredientName) => {dispatch(actions.removeIngredient(ingredientName))},
    onInitiIngredients: () => {dispatch(actions.initIngredients())},
    onPurchaseBegin: () => {dispatch(actions.purchaseBegin())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));