//DOM selectors
const todoList = document.querySelector(".todo-tasks")
const todoInput = document.querySelector(".todo-input");
const todoAddButton = document.querySelector(".todo-add-button");

//Event listeners
todoAddButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteAndComplete);
document.addEventListener("DOMContentLoaded", loadTasks);

//adds tasks to the list
function addTask(event) {

if (todoInput.value === "") {
    alert ("Please enter a task :)");
} else {
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
}

//Deletes and completes the tasks
function deleteAndComplete(event) {
    const item = event.target;
    const task = item.parentElement;

    if (item.classList.contains("eliminate-button")) {
        task.remove();
    const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks"));
    const taskText = task.querySelector(".new-task").innerText;

    if (storedDeletedTasks !== null) {
      storedDeletedTasks.push(taskText);
      localStorage.setItem("deletedTasks", JSON.stringify(storedDeletedTasks));
    } else {
      localStorage.setItem("deletedTasks", JSON.stringify([taskText]));
    }

    return;
    }
    if (item.classList.contains ("completed-button")) {
        task.classList.toggle("done");
        const storedDoneTasks = JSON.parse(localStorage.getItem("doneTasks"));
        const taskText = task.querySelector(".new-task").innerText;
    
        if (storedDoneTasks !== null && storedDoneTasks.includes(taskText)) {
          // Task was marked as done, remove it from "doneTasks"
          const updatedDoneTasks = storedDoneTasks.filter(
            (doneTask) => doneTask !== taskText
          );
          localStorage.setItem("doneTasks", JSON.stringify(updatedDoneTasks));
        } else {
          // Task was not marked as done, add it to "doneTasks"
          const updatedDoneTasks = storedDoneTasks !== null ? [...storedDoneTasks, taskText] : [taskText];
          localStorage.setItem("doneTasks", JSON.stringify(updatedDoneTasks));
        }
    
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
//Load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks !== null) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
        // Check if the task has been deleted
        const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks"));
        if (deletedTasks !== null && deletedTasks.includes(task)) {
          return; // Skip the task if it has been deleted
        }
      
        const toDoElement = document.createElement("div");
      toDoElement.classList.add("toDoTask");

      const newTaskElement = document.createElement("li");
      newTaskElement.innerText = task;
      newTaskElement.classList.add("new-task");
      toDoElement.appendChild(newTaskElement);

      const completedButton = document.createElement("button");
      completedButton.innerText = "✅";
      completedButton.classList.add("completed-button");
      toDoElement.appendChild(completedButton);

      const eliminateButton = document.createElement("button");
      eliminateButton.innerText = "❌";
      eliminateButton.classList.add("eliminate-button");
      toDoElement.appendChild(eliminateButton);

    //Checks if the task is marked as done
      const storedDoneTasks = JSON.parse(localStorage.getItem("doneTasks"));
      if (storedDoneTasks !== null && storedDoneTasks.includes(task)) {
        toDoElement.classList.add("done");
      }

      todoList.appendChild(toDoElement);
  });
  }
}