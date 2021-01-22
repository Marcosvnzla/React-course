import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];

  if (props.bstate) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.bstate} clicked={props.closed} />
      <div className={attachedStyles.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;