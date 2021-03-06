import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Order from '../../components/Order/Order';
import withError from '../../hoc/withError/withError';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json?auth=' + this.props.token)
    .then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({id: key, ...response.data[key]});
      }
      this.setState({orders: fetchedOrders, loading: false});
      console.log(this.state.orders);
    })
    .catch(err => {
      this.setState({loading: false});
    });
  }

  render () {
    const orders = this.state.orders.map(order => (
      <Order key={order.id} totalPrice={order.price} ingredients={order.ingredients} />
    ));
    return(
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(withError(Orders, axios));