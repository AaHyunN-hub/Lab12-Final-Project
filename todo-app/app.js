// Todo App - Simple version

var todos = [];
var filter = 'all';

var input = document.getElementById('todoInput');
var addBtn = document.getElementById('addBtn');
var list = document.getElementById('todoList');
var count = document.getElementById('itemCount');
var clearBtn = document.getElementById('clearBtn');
var filters = document.querySelectorAll('.filter');

function loadTasks() {
    var saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
    }
}

function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTask() {
    var text = input.value.trim();
    if (text == '') {
        return;
    }
    todos.push({
        id: Date.now(),
        text: text,
        done: false
    });
    input.value = '';
    saveTasks();
    showTasks();
}

function deleteTask(id) {
    var newTodos = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id != id) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
    saveTasks();
    showTasks();
}

function toggleTask(id) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].done = !todos[i].done;
            break;
        }
    }
    saveTasks();
    showTasks();
}

function clearDone() {
    var newTodos = [];
    for (var i = 0; i < todos.length; i++) {
        if (!todos[i].done) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
    saveTasks();
    showTasks();
}

function setFilter(f) {
    filter = f;
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].dataset.filter == f) {
            filters[i].className = 'filter active';
        } else {
            filters[i].className = 'filter';
        }
    }
    showTasks();
}

function showTasks() {
    var filtered = [];
    for (var i = 0; i < todos.length; i++) {
        if (filter == 'all') {
            filtered.push(todos[i]);
        } else if (filter == 'active' && !todos[i].done) {
            filtered.push(todos[i]);
        } else if (filter == 'completed' && todos[i].done) {
            filtered.push(todos[i]);
        }
    }

    if (filtered.length == 0) {
        list.innerHTML = '<li class="empty">No tasks here</li>';
    } else {
        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var t = filtered[i];
            var cls = t.done ? 'done-text' : '';
            var checked = t.done ? 'checked' : '';
            html += '<li>';
            html += '<input type="checkbox" class="cb" data-id="' + t.id + '" ' + checked + ' />';
            html += '<span class="' + cls + '">' + t.text + '</span>';
            html += '<button class="delete-btn" data-id="' + t.id + '">X</button>';
            html += '</li>';
        }
        list.innerHTML = html;
    }

    var left = 0;
    for (var i = 0; i < todos.length; i++) {
        if (!todos[i].done) {
            left++;
        }
    }
    count.innerHTML = left + ' tasks left';

    var hasDone = false;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].done) {
            hasDone = true;
            break;
        }
    }
    if (hasDone) {
        clearBtn.style.display = 'inline';
    } else {
        clearBtn.style.display = 'none';
    }
}

// Events
addBtn.onclick = addTask;

input.onkeydown = function(e) {
    if (e.key == 'Enter') {
        addTask();
    }
};

clearBtn.onclick = clearDone;

for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
        setFilter(this.dataset.filter);
    };
}

list.onclick = function(e) {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(parseInt(e.target.dataset.id));
    }
};

list.onchange = function(e) {
    if (e.target.classList.contains('cb')) {
        toggleTask(parseInt(e.target.dataset.id));
    }
};

// Start
loadTasks();
showTasks();
