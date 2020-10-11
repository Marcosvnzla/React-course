import React, { Fragment } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
  return(
    <Fragment>
      <Toolbar />
      <main className={styles.main}>
        {props.children}
      </main>
    </Fragment>
  );
}

export default layout;