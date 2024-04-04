var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Load tasks from local storage
window.addEventListener('load', function() {
    var storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todoList = JSON.parse(storedTodos);
        addinmain(todoList);
        update();
    }
});

// Save tasks to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todoList));
}

// Event listeners for add and delete buttons
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listeners for filters
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Event listener for enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Updates the remaining and completed tasks count
function update() {
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    document.getElementById("r-count").innerText = remList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

// Adds a new task
function add() {
    var value = todoInput.value.trim();
    if (value === '') {
        alert("😮 Task cannot be empty , please enter correct value");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = "";
    update();
    addinmain(todoList);
    saveToLocalStorage();
}

// Renders tasks on the main content
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

// Deletes a task
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => ele.id != deleted);
    update();
    addinmain(todoList);
    saveToLocalStorage();
}

// Completes a task
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            obj.complete = !obj.complete;
        }
    });
    update();
    addinmain(todoList);
    saveToLocalStorage();
}

// Deletes all tasks
function deleteAll(todo) {
    todoList = [];
    update();
    addinmain(todoList);
    saveToLocalStorage();
}

// Deletes only completed tasks
function deleteS(todo) {
    todoList = todoList.filter((ele) => !ele.complete);
    update();
    addinmain(todoList);
    saveToLocalStorage();
}

// Functions for filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}
