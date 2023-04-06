//DOM selectors
const todoList = document.querySelector(".todo-tasks")
const todoInput = document.querySelector(".todo-input");
const todoAddButton = document.querySelector(".todo-add-button");

//Event listeners
todoAddButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteAndComplete);

//adds tasks to the list
function addTask(event) {
//The next line was added after consulting ChatGPT
//Prevents the button from refreshing the input
    event.preventDefault();

    //creates a container for tasks
    const toDoElement = document.createElement("div");
    toDoElement.classList.add("toDoTask");
    saveToLocalStorage(todoInput.value);

    //creates the list of tasks
    const newTaskElement = document.createElement("li");
    newTaskElement.innerText = todoInput.value;
    newTaskElement.classList.add("new-task");
    toDoElement.appendChild(newTaskElement);
    todoInput.value = "";

    //Done button
    const completedButton = document.createElement("button");
    completedButton.innerText = "✅";
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

//Deletes and completes the tasks
function deleteAndComplete(event) {
    const item = event.target;
    if (item.classList[0] === "eliminate-button") {
        const task = item.parentElement;
        task.remove();
    }
    if (item.classList[0] === "completed-button") {
        const task = item.parentElement;
        task.classList.toggle("done");
    }
}

// The local storage part was adapted from this video https://www.youtube.com/watch?v=Ttf3CEsEwMQ&t=3673s&ab_channel=developedbyed and ChatGPT
//Local storage
function saveToLocalStorage(toDoTask) {
    let tasks;
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks === null || !Array.isArray(JSON.parse(storedTasks))) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(toDoTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
