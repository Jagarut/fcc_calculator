import React, { Component } from "react";
import Keys, { PAIRS } from "./keys";

import "./css/keypad.css";

class KeyPad extends Component {
  handleClick = (event) => {
    this.props.onKeyClick(PAIRS[event.target.id]);
  };

  render() {
    return (
      <div className="keypad" onClick={this.handleClick}>
        {Keys.map((key) => (
          <div
            key={key.id}
            id={key.id}
            className={`${key.id} ${key.type} `}
            onClick={this.handleClick}
          >
            {key.symbol}
          </div>
        ))}
      </div>
    );
  }
}

export default KeyPad;
