'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const noTasksMessage = document.getElementById('no-tasks-message');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Load tasks from local storage
    let tasks = loadTasksFromLocalStorage();

    // --- Event Listeners ---
    addTaskButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Use event delegation for delete buttons
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const taskItem = event.target.closest('.task-item');
            if (taskItem) {
                const taskId = taskItem.dataset.id; // Get ID from data attribute
                deleteTask(taskId);
            }
        }
    });

    // --- Core Functions ---
    function handleAddTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            taskInput.focus();
            return;
        }

        const newTask = {
            id: Date.now().toString(), // Unique ID as a string
            text: taskText,
            // completed: false // For future "mark as complete" functionality
        };

        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = ''; // Clear input field
        taskInput.focus();    // Set focus back to input
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasksToLocalStorage();
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks from the list

        if (tasks.length === 0) {
            noTasksMessage.classList.remove('hidden');
            taskList.classList.add('hidden');
        } else {
            noTasksMessage.classList.add('hidden');
            taskList.classList.remove('hidden');

            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.className = 'task-item';
                listItem.dataset.id = task.id; // Store task ID as a data attribute

                const taskTextSpan = document.createElement('span');
                taskTextSpan.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';

                listItem.appendChild(taskTextSpan);
                listItem.appendChild(deleteButton);
                taskList.appendChild(listItem);
            });
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                return JSON.parse(storedTasks);
            } catch (error) {
                console.error("Error parsing tasks from local storage:", error);
                // Optionally, clear corrupted data: localStorage.removeItem('tasks');
                return []; // Return empty array if parsing fails
            }
        }
        return []; // Return empty array if no tasks are stored
    }

    // Initial render of tasks when the page loads
    renderTasks();
});
