import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import * as actions from './store/actions/index';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckStatus();
  }  

  render () {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
        </Layout> 
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckStatus: () => {dispatch(actions.authCheckStatus())}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));