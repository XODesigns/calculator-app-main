const form = document.querySelector("form");
const button = document.querySelectorAll("input[type='button']");
const screen = document.querySelector("#screen");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

button.forEach((e) => {

  e.addEventListener("click", (evt) => {
    // valueArr.push(evt.value)
    // let num = evt.currentTarget.value
    
    // if(num !== "+" && num !== "DEL" && num !== "-" && num !== "x" && num !== "RESET" && num !== "="&& num !== "/"){
    //  let sum = Number(num)
    //  screen.innerHTML += sum
    //  console.log(typeof(sum))
    // }
 

  });
});
