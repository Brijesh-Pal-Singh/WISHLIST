let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;

// Try to fetch data from localStorage and parse it
let localData = localStorage.getItem("todo");
let todoList = [];

try {
    todoList = localData ? JSON.parse(localData) : [];
} catch (e) {
    todoList = []; // Fallback to an empty array if there was an error
}

// Function to generate unique IDs for each todo
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Event listener for adding a todo
addTodoButton.addEventListener("click", (e) => {
    todo = todoInput.value;

    e.preventDefault();
    if (todo.length > 0) {
        todoList.push({ id: uuid(), todo, isCompleted: false });
        localStorage.setItem("todo", JSON.stringify(todoList)); // Update local storage
    }
    renderTodoList(todoList);
    todoInput.value = ""; // Clear the input field after adding
});

// Event listener for interacting with todo items (mark as completed or delete)
showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;

    if (key) {
        todoList = todoList.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    }
    if (delTodoKey) {
        todoList = todoList.filter(todo => todo.id !== delTodoKey);
    }

    localStorage.setItem("todo", JSON.stringify(todoList)); // Update local storage
    renderTodoList(todoList);
});

// Function to render the todo list
function renderTodoList(todoList) {
    showTodos.innerHTML = todoList.map(({ id, todo, isCompleted }) => `
        <div class="todo relative">
            <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ? "checked" : ""}>
            <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todo}</label>
            <button class="absolute right-0 button cursor">
                <span data-todokey=${id} class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `).join('');
}

// Initial render of todo list
renderTodoList(todoList);
