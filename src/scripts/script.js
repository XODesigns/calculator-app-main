const form = document.querySelector("form");
const numbers = document.querySelectorAll("[data-number]");
const evalutionButtons = document.querySelectorAll("[data-evaluation]");
const deletes = document.querySelector("[data-delete]");
const reset = document.querySelector("[data-reset]");
const equals = document.querySelector("[data-equals]");
const screen = document.querySelector("#screen");
const previousOperandOutput = document.querySelector("[data-previous-operand]");
const currentOperandOutput = document.querySelector("[data-current-operand]");
const toggles = document.querySelector("[data-circle]");
const theme = document.querySelector("#themes");

form.addEventListener("click", (evt) => {
  evt.preventDefault();
});

//Changing of themes every toggle click
theme.classList.add("theme-one");
toggles.addEventListener("click", handler, false);
toggles.addEventListener("touchend", handler, false);
// toggles.addEventListener("click", (evt) => {
//   // if (evt.target.value === "1") {
//   //   theme.classList.remove("theme-one");
//   //   theme.classList.add("theme-two");
//   //   theme.classList.remove("theme-three");
//   // } else if (evt.target.value === "2") {
//   //   theme.classList.remove("theme-one");
//   //   theme.classList.remove("theme-two");
//   //   theme.classList.add("theme-three");
//   // } else {
//   //   theme.classList.add("theme-one");
//   //   theme.classList.remove("theme-two");
//   //   theme.classList.remove("theme-three");
//   // }
// });

function handler(evt) {
  if (evt.target.value === "1") {
    theme.classList.remove("theme-one");
    theme.classList.add("theme-two");
    theme.classList.remove("theme-three");
  } else if (evt.target.value === "2") {
    theme.classList.remove("theme-one");
    theme.classList.remove("theme-two");
    theme.classList.add("theme-three");
  } else {
    theme.classList.add("theme-one");
    theme.classList.remove("theme-two");
    theme.classList.remove("theme-three");
  }
}

// Declaring a constructor class, this will be doing the calculations

class Calculation {
  constructor(previousOperandOutput, currentOperandOutput) {
    this.previousOperandOutput = previousOperandOutput;
    this.currentOperandOutput = currentOperandOutput;
    this.clear();
  }

  clear() {
    this.currentOutput = "";
    this.previousOutput = "";
    this.evaluation = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  addDigits(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(evaluation) {
    if (this.currentOutput === "") return;
    if (this.previousOutput !== "") {
      this.compute();
    }
    this.evaluation = evaluation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOutput);
    const current = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.evaluation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOutput = computation;
    this.evaluation = undefined;
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
    if (this.evaluation != null) {
      this.previousOperandOutput.innerText = `${this.displayedNumber(
        this.previousOutput
      )} ${this.evaluation}`;
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
    calculation.chooseOperation(button.value);
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
