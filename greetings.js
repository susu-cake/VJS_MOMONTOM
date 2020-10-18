const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_ON = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreetings(currentValue);
    saveName(currentValue);
}


function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);
}

function paintGreetings(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}
    
    

function loadname(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreetings(currentUser);
    }
}

function init(){
    loadname();
    }

    init();