import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showDrawer: false
  }

  sideDrawerToggle  = () => {
    this.setState((prevState) => {
      return {showDrawer: !prevState.showDrawer};
    });
  };

  render() {
    return(
      <Fragment>
        <Toolbar isAuth={this.props.isAuthorized} menuClicked={this.sideDrawerToggle}/>
        <SideDrawer isAuth={this.props.isAuthorized} bstate={this.state.showDrawer} closed={this.sideDrawerToggle} />
        <main className={styles.main}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.token !== null
  }
}

export default connect(mapStateToProps)(Layout);