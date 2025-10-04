const todoList = [
  {
    name: 'review course',
    dueDate: '2025-09-29'
  }
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo, index) => {
    const { name, dueDate } = todo;

    const inner = `
      <div class="todo-item">
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo" data-index="${index}">
          Delete
        </button>
      </div>
    `;
    todoListHTML += inner;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

 
  document.querySelectorAll('.js-delete-todo').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      deleteTodo(index);
    });
  });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name && dueDate) {
    todoList.push({ name, dueDate });
    renderTodoList();
  }

  inputElement.value = '';
  dateInputElement.value = '';
}


function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}
