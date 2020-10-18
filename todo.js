const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");



function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(todo){
        console.log(todo.id, li.id);
        return todo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const toDoLi = document.createElement("li");
    const toDoDelBtn = document.createElement("button");
    toDoDelBtn.innerText = "del";
    toDoDelBtn.addEventListener("click", deleteToDo);
    const toDoSpan = document.createElement("span");
    const newId = toDos.length + 1;
    toDoSpan.innerText = text;
    toDoLi.appendChild(toDoSpan);
    toDoLi.appendChild(toDoDelBtn);
    toDoLi.id = newId;
    toDoList.appendChild(toDoLi);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();