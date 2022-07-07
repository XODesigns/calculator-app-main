const form = document.querySelector("form");
const button = document.querySelectorAll("input[type='button']");
const screen = document.querySelector("#screen");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

button.forEach((e) => {

  e.addEventListener("click", (evt) => {

    const value = evt.currentTarget.value
 
    if(value === "RESET"){
      screen.innerHTML = ""
    } else if(value === "DEL"){
      screen.innerHTML = screen.innerHTML.slice(0, -1)
    } 

  });
});
