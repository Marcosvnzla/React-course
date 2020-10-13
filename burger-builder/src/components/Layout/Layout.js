import React, { Component, Fragment } from 'react';
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
        <Toolbar menuClicked={this.sideDrawerToggle}/>
        <SideDrawer bstate={this.state.showDrawer} closed={this.sideDrawerToggle} />
        <main className={styles.main}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;