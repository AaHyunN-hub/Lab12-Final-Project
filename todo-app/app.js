// ============================================
// Todo App - Vanilla JavaScript
// Open Source · Inspired by TodoMVC
// ============================================

// ----- State -----
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// ----- DOM Refs -----
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemCount = document.getElementById('itemCount');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter');

// ----- Core Functions -----
function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false,
    });

    todoInput.value = '';
    save();
    render();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    save();
    render();
}

function toggleTodo(id) {
    todos = todos.find(t => t.id === id).completed ^= true;
    save();
    render();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    save();
    render();
}

function setFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    render();
}

// ----- Render -----
function render() {
    const filtered = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    if (filtered.length === 0) {
        todoList.innerHTML = `<li class="empty-msg">✨ No tasks here — add one above!</li>`;
    } else {
        todoList.innerHTML = filtered.map(t => `
            <li class="todo-item" data-id="${t.id}">
                <input type="checkbox" class="todo-checkbox" ${t.completed ? 'checked' : ''} />
                <span class="todo-text ${t.completed ? 'completed' : ''}">${escapeHtml(t.text)}</span>
                <button class="todo-delete">✕</button>
            </li>
        `).join('');
    }

    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

    clearBtn.style.display = todos.some(t => t.completed) ? 'inline' : 'none';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ----- Event Delegation -----
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('todo-delete')) {
        deleteTodo(id);
    }
});

todoList.addEventListener('change', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
        const li = e.target.closest('.todo-item');
        const id = parseInt(li.dataset.id);
        toggleTodo(id);
    }
});

// ----- Enter key -----
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// ----- Button listeners -----
addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// ----- Init -----
render();
