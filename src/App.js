import React, { Component } from "react";
import Display from "./components/Display";
import Keypad from "./components/KeyPad";
import "./components/css/display.css";

import "./app.css";

/* eslint no-eval: 0 */

class App extends Component {
  state = {
    display: undefined,
    inputNumber: "0",
    lastPressed: undefined,
    result: undefined,
    op: undefined,
  };

  clear = () => {
    this.setState({
      inputNumber: "0",
      lastPressed: undefined,
      result: undefined,
      display: undefined,
      op: undefined,
    });
  };

  handleKeyClick = (symbol) => {
    const { result, inputNumber, lastPressed, display, op } = this.state;

    if (lastPressed === "=" && !isNaN(Number(symbol))) {
      console.log("equal");
      this.setState({
        result: symbol,
        inputNumber: symbol,
        lastPressed: symbol,
        display: symbol,
      });
      return;
    }

    switch (symbol) {
      case "AC":
        console.log(symbol + " click");
        this.clear();
        break;

      case "=":
        // let evaluated = 1;
        // let temp = result;

        //revisar esta lógica!!!!!!!!!!!!
        // if (result.length === 2) {
        //   if (temp[1] === "/" || temp[1] === "*") {
        //     evaluated = eval("Number(temp[0]) * 1");
        //   } else {
        //     evaluated = eval("Number(temp[0]) + 0");
        //   }
        //   this.setState({
        //     display: result.slice(0, -1) + "=" + evaluated,
        //     result: evaluated,
        //     inputNumber: result.slice(0, -1),
        //   });
        //   return;
        // }
        const evaluated = eval(result);
        this.setState({
          inputNumber: evaluated,
          result: evaluated,
          display: result + "=" + evaluated,
        });
        break;

      case ".":
        if (lastPressed === "=") {
          this.setState({
            display: "0.",
            inputNumber: "0.",
            lastPressed: undefined,
            result: "0.",
            op: undefined,
          });
          return;
        }

        if (!inputNumber.includes(".")) {
          this.setState({
            inputNumber: inputNumber + symbol,
            result: result === undefined ? "0" + symbol : result + symbol,
            display: result === undefined ? "0" + symbol : result + symbol,
          });
        }
        break;

      case "+":
        if (op && op !== "-") {
          this.setState({
            display: display.slice(0, -1) + "+",
            result: display.slice(0, -1) + "+",
            inputNumber: symbol,
            op: symbol,
          });
        } else if (op === "-") {
          this.setState({
            display: display.slice(0, -2) + symbol,
            result: display.slice(0, -2) + symbol,
            inputNumber: symbol,
            op: symbol,
          });
        } else {
          this.setState({
            inputNumber: "+",
            result:
              result === undefined || inputNumber === 0
                ? symbol
                : result + symbol,
            display:
              result === undefined || inputNumber === 0
                ? symbol
                : result + symbol,
            op: "+",
          });
        }
        break;

      case "-":
        if (lastPressed !== "-") {
          this.setState({
            inputNumber: symbol,
            result: result + symbol,
            display: result + symbol,
            op: symbol,
          });
        } else if (
          ["/", "*", "+"].includes(display.charAt(display.length - 2))
        ) {
          this.setState({
            display: display.slice(0, -1) + symbol,
            result: display.slice(0, -1) + symbol,
            inputNumber: symbol,
            op: symbol,
          });
        } else if (display.slice(-3) !== "- -") {
          this.setState({
            display: display.slice(0, -1) + symbol + " -",
            result: display.slice(0, -1) + symbol + " -",
            inputNumber: symbol,
            op: symbol,
          });
        }
        break;

      case "*":
        if (op && op !== "-") {
          this.setState({
            display: display.slice(0, -1) + "*",
            result: display.slice(0, -1) + "*",
            inputNumber: symbol,
            op: symbol,
          });
        } else if (op === "-") {
          this.setState({
            display: display.slice(0, -2) + symbol,
            result: display.slice(0, -2) + symbol,
            inputNumber: symbol,
            op: symbol,
          });
        } else {
          this.setState({
            inputNumber: "*",
            result: result + "*",
            display: result + "*",
            op: "*",
          });
        }
        break;

      case "/":
        if (op && op !== "-") {
          this.setState({
            display: display.slice(0, -1) + symbol,
            result: display.slice(0, -1) + symbol,
            inputNumber: symbol,
            op: symbol,
          });
        } else if (op === "-") {
          this.setState({
            display: display.slice(0, -2) + symbol,
            result: display.slice(0, -2) + symbol,
            inputNumber: symbol,
            op: symbol,
          });
        } else {
          this.setState({
            inputNumber: symbol,
            result: result + symbol,
            display: result + symbol,
            op: symbol,
          });
        }
        break;

      default:
        this.setState({
          result:
            result === undefined || inputNumber === "0"
              ? symbol
              : result + symbol,
          display:
            result === undefined || inputNumber === "0"
              ? symbol
              : result + symbol,
          inputNumber:
            inputNumber === "0" || ["/", "*", "+", "-"].includes(inputNumber)
              ? symbol
              : inputNumber + symbol,
          op: ["/", "*", "+", "-"].includes(symbol) && symbol,
        });
        break;
    }

    this.setState({
      lastPressed: symbol,
    });
  };

  render() {
    const { inputNumber, display } = this.state;
    return (
      <div className="container">
        <p
          style={{
            position: "absolute",
            top: 580,
            color: "black",
            fontSize: "16px",
          }}
        >
          {JSON.stringify(this.state, null, 2)}
        </p>
        <div className="operacion">{display}</div>
        {/* <Display result={display} color="orange" /> */}
        <Display result={inputNumber} />
        <Keypad onKeyClick={this.handleKeyClick} />
      </div>
    );
  }
}

export default App;
