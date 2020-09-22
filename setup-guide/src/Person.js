import React from 'react';

function person(props) { // props = properties
  return (
    <div>
      <p>Hi! I'm {props.name} and I'm {props.age}</p>
      <div>{props.children}</div>
    </div>
  );
}

export default person;