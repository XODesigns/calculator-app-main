const form = document.querySelector("form");
const numbers = document.querySelectorAll("[data-number]");
const evalutionButtons = document.querySelectorAll("[data-evaluation]");
const deletes = document.querySelector("[data-delete]");
const reset = document.querySelector("[data-reset]");
const equals = document.querySelector("[data-equals]");
const screen = document.querySelector("#screen");
const previousOperandOutput = document.querySelector("[data-previous-operand]");
const currentOperandOutput = document.querySelector("[data-current-operand]");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

// button.forEach((e) => {
//   e.addEventListener("click", (evt) => {
//     const value = evt.currentTarget.value;

//     if (value === "RESET") {
//       screen.innerHTML = "";
//     } else if (value === "DEL") {
//       screen.innerHTML = screen.innerHTML.slice(0, -1);
//     }
   
   
// });
// })

// Declaring a constructor class, this will be doing the calculations

class Calculation {
  constructor(previousOutput, currentOutput) {
    this.previousOutput = previousOutput;
    this.currentOutput = currentOutput;
    this.clear();
  }

  clear() {
    this.currentOutput = "";
    this.previousOutput = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  addDigits(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOutput === "") return;
    if (this.previousOutput !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOutput);
    const current = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "&divide":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOutput = computation;
    this.operation = undefined;
    this.previousOutput = "";
  }

  // This function will add a comma when digits become larger

  displayedNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateScreen() {
    this.currentOperandOutput.innerText = this.displayedNumber(
      this.currentOutput
    );
    if (this.operation != null) {
      this.previousOperandOutput.innerText = `${this.displayedNumber(
        this.previousOutput
      )} ${this.operation}`;
    } else {
      this.previousOperandOutput.innerText = "";
    }
  }
}


// call the about class and add both the entered previous value and current to the given
// given arguments

const calculation = new Calculation(
  previousOperandOutput,
  currentOperandOutput
);

// When each given button is clicked - the connected functions, declared in the
// constructor class will be executed.

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculation.addDigits(button.value);
    calculation.updateScreen();
  });
});

evalutionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculation.chooseOperation(button.innerText);
    calculation.updateScreen();
  });
});

equals.addEventListener("click", () => {
  calculation.compute();
  calculation.updateScreen();
});

reset.addEventListener("click", () => {
  calculation.clear();
  calculation.updateScreen();
});

deletes.addEventListener("click", () => {
  calculation.delete();
  calculation.updateScreen();
});


