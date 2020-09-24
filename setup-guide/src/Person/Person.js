import React from 'react';
import './Person.css';

function person(props) { // props = properties
  return (
    <div className="Person">
      <p onClick={props.click}>Hi! I'm {props.name} and I'm {props.age}</p>
      <input type="text" onChange={props.changedName} value={props.name}/>
      <div>{props.children}</div>
    </div>
  );
}

export default person;