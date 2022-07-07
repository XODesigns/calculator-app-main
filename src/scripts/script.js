const form = document.querySelector("form");
const button = document.querySelectorAll("button");
const screen = document.querySelector("#screen");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

button.forEach((e) => {
  const arr = [];
  e.addEventListener("click", (evt) => {
    // if (button[0]) {
    //   arr.push(button[0].className);
    // }
    // console.log(arr);
    // screen.innerHTML = arr;
    // if (operator === "") { // Read first number if no operator set yet
    //     firstNum += e.target.innerText;
    //     console.log(firstNum)
    // } else { // Read second number
    //     secondNum += e.target.innerText;
    //     console.log(secondNum)
    // }
  });
});
