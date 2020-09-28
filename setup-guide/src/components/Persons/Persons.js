import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
  return(
    props.persons.map((person, index) => {
      return <Person 
        click={() => props.clicked(index)}
        changedName={event => props.changed(event, person.id)}
        key={person.id}
        name={person.name} 
        age={person.age} />
    })
  );
}

export default persons;