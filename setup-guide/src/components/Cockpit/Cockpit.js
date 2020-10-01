import React, { useContext } from 'react';
import styles from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const context = useContext(AuthContext);
  const classes = [];
  if (props.personsLength <= 2) {
    classes.push(styles.red);
  }
  if (props.personsLength <= 1) {
    classes.push(styles.bold);
  }

  return(
    <div>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>Dinamically added classes</p>
      <button 
        className={props.buttonStyles.join(' ')}
        onClick={props.clicked}>Toggle Persons
      </button>
      <button onClick={context.login}>Log in</button>
    </div>
  );
};

export default cockpit;