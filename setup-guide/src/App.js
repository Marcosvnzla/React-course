import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  generateId = () => {
    return new Date().getTime().toString() + Math.floor(Math.random()*1000000);
  }

  state = { //only available for classes extended to Component. Object
    persons: [
      {id: this.generateId(), name: 'Caro', age: '27'},
      {id: this.generateId(), name: 'Alex', age: '26'},
      {id: this.generateId(), name: 'Marcos', age: '24'}
    ],
    showPersons: false
  }


  changeName = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  toggleNames = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePerson = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={this.deletePerson.bind(this, index)}
              changedName={event => this.changeName(event, person.id)}
              key={person.id}
              name={person.name} 
              age={person.age} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>I'm a React app!</h1>
        <button 
          style={style}
          onClick={() => this.toggleNames()}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
