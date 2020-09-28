import React from 'react';
import styles from './Person.module.css';

function person(props) { // props = properties
  return (
    <div className={styles['Person']}>
      <p onClick={props.click}>Hi! I'm {props.name} and I'm {props.age}</p>
      <input type="text" onChange={props.changedName} value={props.name}/>
      <div>{props.children}</div>
    </div>
  );
}

export default person;