import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
  const labels = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'}
  ];

  const controls = labels.map(control => {
    return <BuildControl 
              disabled={props.disabled[control.type]}
              clickedRemove={() => props.removeMethod(control.type)}
              clickedAdd={() => props.addMethod(control.type)}
              key={Math.random() + control.type} 
              label={control.label} />;
  });

  return (
    <div className={styles.BuildControls}>
      {controls}
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      <button onClick={props.orderClicked} className={styles.OrderButton} disabled={!props.purchasable}>{props.isAuth ? 'Order Now!' : 'Sign in to order'}</button>
    </div>
  );
};

export default buildControls;