import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input': 
      inputElement = <input className={styles.InputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break;
  
    case 'textarea': 
      inputElement = <textarea className={styles.InputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break;

    case 'select':
      inputElement = (
        <select className={styles.InputElement} onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map(option => {
            return <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
          })}
        </select>
      );
      break;
  
    default:
      inputElement = <input className={styles.InputElement} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break;
  }

  return(
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;