import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = { 
    ingredients: {}
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

    for (let param of query.entries()) {
      paramIngredients[param[0]] = +param[1];
    }

    this.setState({ingredients: paramIngredients});
  }

  render() {
    return(
      <div>
        <CheckoutSummary 
          onCancel={this.checkoutCancel}
          onContinue={this.checkoutContinue}
          ingredients={this.state.ingredients} />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;