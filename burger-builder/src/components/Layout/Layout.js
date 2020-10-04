import React, { Fragment } from 'react';
import styles from './Layout.module.css';

const layout = (props) => {
  return(
    <Fragment>
      <div>Toolbar, Sidedrawer, Backdrop</div>
      <main className={styles.main}>
        {props.children}
      </main>
    </Fragment>
  );
}

export default layout;