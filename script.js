const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateList() {
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${t} <button class="deleteBtn" onclick="deleteTask(${i})">Delete</button>`;
    list.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(i) {
  tasks.splice(i, 1);
  updateList();
}

addBtn.onclick = () => {
  if (input.value.trim()) {
    tasks.push(input.value.trim());
    input.value = "";
    updateList();
  }
};

updateList();
