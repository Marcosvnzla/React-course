import React, { Component } from "react";
import styles from "./Person.module.css";

class Person extends Component {
  // props = properties
  constructor(props) {
    super(props);
    this.inputElRef = React.createRef();
  }
  componentDidMount() {
    this.inputElRef.current.focus();
  }
  render() {
    return (
      <div className={styles["Person"]}>
        <p onClick={this.props.click}>
          Hi! I'm {this.props.name} and I'm {this.props.age}
        </p>
        <input
          ref={this.inputElRef}
          type="text"
          onChange={this.props.changedName}
          value={this.props.name}
        />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Person;
