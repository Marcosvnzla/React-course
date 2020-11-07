import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = { 
    ingredients: {},
    totalPrice: 0
  }

  checkoutCancel = () => {
    this.props.history.goBack();
  }

  checkoutContinue = () => {
    this.props.history.push(this.props.match.path + '/contact-data');
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const paramIngredients = {};
    let price = null;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        paramIngredients[param[0]] = +param[1];
      }
    }

    this.setState({ingredients: paramIngredients, totalPrice: price});
  }

  render() {
    return(
      <div>
        <CheckoutSummary 
          onCancel={this.checkoutCancel}
          onContinue={this.checkoutContinue}
          ingredients={this.state.ingredients} />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (
          <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />
        )} />
      </div>
    );
  }
}

export default Checkout;