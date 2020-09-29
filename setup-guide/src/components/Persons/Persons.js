import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  render() {
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          changedName={(event) => this.props.changed(event, person.id)}
          key={person.id}
          name={person.name}
          age={person.age}
        />
      );
    });
  }
}

export default Persons;
