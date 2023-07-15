"use strict";

const main = document.querySelector(".main-container");

const outputContainer = document.querySelector(".output-div");
const inputContainer = document.querySelector(".input-div");

const inputField = document.querySelector(".input1");
const outputField = document.querySelector(".input2");

const addButton = document.querySelector(".btn1");
const editButton = document.querySelector(".btn2");
// const deleteButton = document.querySelector(".btn3");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();

  let input = inputField.value;

  if (input === "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: input,
    isCompleted: false,
  };

  createTask(task);

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

function createTask(task) {
  const taskSample = document.createElement("div");

  const markUp = `
    <div class="input2" type="text" id="${task.id}" "${task.isCompleted}" ? "checked" : ""
  } >${task.name}</div>
  
    <button class="btn2">Done</button>
    <button class="btn3">Remove</button>
    
    `;

  taskSample.innerHTML = markUp;

  main.appendChild(taskSample);
  taskSample.classList.add("output-div");

  if (markUp) {
    inputField.value = "";
  }

  let doneButton = taskSample.querySelector(".btn2");

  doneButton.addEventListener("click", () => {
    let taskDone = taskSample.querySelector(".input2");
    taskDone.style.color = "gray";
    taskDone.style.transition = "0.5s";
  });

  let deleteButton = taskSample.querySelector(".btn3");

  deleteButton.addEventListener("click", () => {
    taskSample.remove();

    const taskId = task.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}
