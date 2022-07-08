// https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/

const form = document.querySelector("form");
const button = document.querySelectorAll("input[type='button']");
const screen = document.querySelector("#screen");
const calculator = document.querySelector(".calc");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

button.forEach((e) => {
  e.addEventListener("click", (evt) => {
    const value = evt.currentTarget.value;

    if (value === "RESET") {
      screen.innerHTML = "";
    } else if (value === "DEL") {
      screen.innerHTML = screen.innerHTML.slice(0, -1);
    }
    // Next, we can use the data-action attribute to determine the type of key that is clicked.
    const key = evt.target;
    const action = key.dataset.action;
    const keyContent = key.value;
    const displayedNum = screen.textContent;
    // If the key does not have a data-action attribute, it must be a number key.
    if (!action) {
      console.log("number key!");
    }
    // If the key has a data-action that is either add, subtract, multiply or divide, we know the key is an operator.
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      // This function is make sure the user sees that they've clicked the right operator button.
      // key.classList.add(some clicked css class i still need to add)

      //We need to tell if the previous key is an operator key or not.
      form.dataset.previousKeyType = "operator";
    }
    // If the key’s data-action is decimal, we know the user clicked on the decimal key.
    if (action === "decimal") {
      screen.textContent = displayedNum + ".";
    }
    // If the key’s data-action is calculate, we know the user clicked on the equals key.
    if (action === "calculate") {
      console.log("equal key!");
    }

    // If the calculator shows 0, we want to replace the calculator’s display with the clicked key. We can do so by replacing the display’s textContent property.
    // If the calculator shows a non-zero number, we want to append the clicked key to the displayed number. To append a number, we concatenate a string.
    // If the previousKeyType is an operator, we want to replace the displayed number with clicked number.
    const previousKeyType = form.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        screen.textContent = keyContent;
      } else {
        screen.textContent = displayedNum + keyContent;
      }
      // console.log(evt.target.value);
    }
  });
});

function calculate() {}
