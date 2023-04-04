//DOM selectors
const todoList = document.querySelector(".todo-tasks")
const todoInput = document.querySelector(".todo-input");
const todoAddButton = document.querySelector(".todo-add-button");

//Event listeners
todoAddButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteTask);


//Functions
function addTask(event) {

   event.preventDefault();
    //creates a container for tasks
    const toDoElement = document.createElement("div");
    toDoElement.classList.add("toDoTask");
    
    //creates the list for tasks
    const newTaskElement = document.createElement("li");
    newTaskElement.innerText = todoInput.value;
    newTaskElement.classList.add("new-task");
    toDoElement.appendChild(newTaskElement);
    todoInput.value = "";

    //Done button
    const completedButton = document.createElement("button");
    completedButton.innerText = "✅ ";
    completedButton.classList.add("completed-button");
    toDoElement.appendChild(completedButton);

    //Eliminate button
    const eliminateButton = document.createElement("button");
    eliminateButton.innerText = "❌";
    eliminateButton.classList.add("eliminate-button");
    toDoElement.appendChild(eliminateButton);

    //Add to the <ul> element
    todoList.appendChild(toDoElement);
}

function deleteTask(event) {
    const item = event.target;
    if (item.classList[0] === "eliminate-button") {
        const task = item.parentElement;
        task.remove();
    }
}