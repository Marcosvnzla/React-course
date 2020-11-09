import React, { Component } from 'react';
import axios from 'axios';
import Order from '../../components/Order/Order';
import withError from '../../hoc/withError/withError';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
    .then(response => {
      console.log(response.data);
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
    return(
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withError(Orders, axios);