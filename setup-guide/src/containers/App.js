import React, { Component } from "react";
import styles from "./App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import AuthContext from "../context/auth-context";

class App extends Component {
  generateId = () => {
    return (
      new Date().getTime().toString() + Math.floor(Math.random() * 1000000)
    );
  };

  state = {
    //only available for classes extended to Component. Object
    persons: [
      { id: this.generateId(), name: "Caro", age: "27" },
      { id: this.generateId(), name: "Alex", age: "26" },
      { id: this.generateId(), name: "Marcos", age: "24" },
    ],
    showPersons: false,
    authenticated: false,
  };

  changeName = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons,
    });
  };

  toggleNames = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  deletePerson = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    const buttonClasses = [styles.Button];

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          changed={this.changeName}
          clicked={this.deletePerson}
          isAuthenticated={this.state.authenticated}
          persons={this.state.persons}
        />
      );
      buttonClasses.push(styles.alt);
    }

    return (
      <div className={styles.App}>
        {" "}
        {/*styles.['App'] alternative*/}
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          <Cockpit
            title={this.props.appTitle}
            buttonStyles={buttonClasses}
            clicked={this.toggleNames}
            personsLength={this.state.persons.length}
          />
          {persons}
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App; //Higher order component.
