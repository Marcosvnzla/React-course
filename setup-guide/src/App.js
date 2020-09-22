import React, { Component } from 'react';
import './App.css';
import Person from './Person';

class App extends Component {
  state = { //only available for classes extended to Component. Object
    persons: [
      {name: 'Caro', age: '27'},
      {name: 'Alex', age: '26'},
      {name: 'Marcos', age: '24'}
    ]
  }

  switchName = () => {
    this.setState({
      persons: [
        {name: 'Takoyaki', age: '27'},
        {name: 'El loco', age: '26'},
        {name: 'Totonon', age: '24'}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>I'm a React app!</h1>
        <button onClick={this.switchName}>Switch Name!</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>
          My hobbies: "Gaming"
        </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
