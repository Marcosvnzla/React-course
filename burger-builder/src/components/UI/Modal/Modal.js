import React from 'react';
import styles from './Modal.module.css';

const modal = (props) => {
  const showClass = props.show ? styles.show : '';

  return (
    <div className={styles.Modal + ' ' + showClass} >
      {props.children}
    </div>
  );
};

export default modal;