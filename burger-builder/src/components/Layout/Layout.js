import React, { Component, Fragment } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showDrawer: true
  }

  sideDrawerClosed  = () => {
    this.setState({showDrawer: false});
  };

  render() {
    return(
      <Fragment>
        <Toolbar />
        <SideDrawer bstate={this.state.showDrawer} closed={this.sideDrawerClosed} />
        <main className={styles.main}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;