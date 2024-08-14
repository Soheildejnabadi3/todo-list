document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-list').addEventListener('click', handleTodoClick);

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === '') return;

    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    saveTodos();
    todoInput.value = '';
}

function handleTodoClick(event) {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        target.parentElement.remove();
        saveTodos();
    } else {
        target.classList.toggle('completed');
        saveTodos();
    }
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        todos.push({
            text: li.textContent.replace('Delete', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const todoList = document.getElementById('todo-list');
        const li = document.createElement('li');
        li.textContent = todo.text;

        if (todo.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}