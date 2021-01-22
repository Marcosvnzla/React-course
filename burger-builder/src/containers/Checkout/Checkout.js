import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancel = () => {
    this.props.history.goBack();
  }

  checkoutContinue = () => {
    this.props.history.push(this.props.match.path + '/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            onCancel={this.checkoutCancel}
            onContinue={this.checkoutContinue}
            ingredients={this.props.ings} />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    purchased: state.purchased
  }
}

export default connect(mapStateToProps)(Checkout);