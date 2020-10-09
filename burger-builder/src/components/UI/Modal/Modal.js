import React, { Fragment } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  const showClass = props.show ? styles.show : '';

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.hideBackdrop} />
      <div className={styles.Modal + ' ' + showClass} >
        {props.children}
      </div>
    </Fragment>
  );
};

export default modal;