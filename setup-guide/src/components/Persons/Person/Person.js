import React, { Component } from 'react';
import styles from './Person.module.css';

class Person extends Component { // props = properties
  render() {
    return (
      <div className={styles['Person']}>
        <p onClick={this.props.click}>Hi! I'm {this.props.name} and I'm {this.props.age}</p>
        <input type="text" onChange={this.props.changedName} value={this.props.name}/>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Person;