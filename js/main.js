const form = document.querySelector('#form'),
    taskInput = document.querySelector('#taskInput'),
    emptyList = document.querySelector('#emptyList'),
    tasksList = document.querySelector('#tasksList');
    


let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach((task) => {
        renderTask(task);
    });
}



checkEmptyList();


form.addEventListener('submit', addTask);

function addTask(event) {

    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    saveToLocalStorage();

    renderTask(newTask);       

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();

    
};

tasksList.addEventListener('click', deleteTask);

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') {
        return;
    }

    const parenNode = event.target.closest('.list-group-item');

    const id = Number(parenNode.id);

    const index = tasks.findIndex((task) => {
        if (task.id === id) {
            return true;
        }
    });

    tasks.splice(index, 1);

    parenNode.remove();
    checkEmptyList();
    saveToLocalStorage();
}

tasksList.addEventListener('click', doneTask);

function doneTask(event) {
    if (event.target.dataset.action !== 'done') {
        return;
    }

    const parenNode = event.target.closest('.list-group-item');
    const taskTitle = parenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    const id = Number(parenNode.id);

    const task = tasks.find((task) => {
        if (task.id === id) {
            return true;
        } else {
            return false;
        }
    });

    task.done = !task.done;

    saveToLocalStorage();
};

function checkEmptyList() {
   
    
    if (tasks.length == 0) {
        let list = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li> 
        `;

        tasksList.insertAdjacentHTML("afterbegin", list);
    };

    if (tasks.length > 0) {
        const emptyList = document.querySelector("#emptyList");

        emptyList ? emptyList.remove() : null; 
    };


}


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `
        <li id = "${task.id}"class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>

    `;
    
    tasksList.insertAdjacentHTML("beforeend", taskHTML);
}



