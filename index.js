//DOM selectors

const todoInput = document.querySelector(".todo-input");
const todoAddButton = document.querySelector(".todo-add-button");
const todoList = document.querySelector(".todo-tasks")

//Event listeners

todoAddButton.addEventListener('click', addTodo);


//Functions

function addTodo(event) {

    //creates a container for tasks
    const toDoElement = document.createElement('div');
    toDoElement.classList.add('toDoTask');
    
    //creates the list for tasks
    const newTaskElement = document.createElement('li');

}