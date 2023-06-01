import { format } from 'date-fns';
import Todo from './todo';

let project = null;

export function setProject(proj) {
  project = proj;
}

const root = document.querySelector('#root');

// Create an element with a specified type and classes
function createElement(type, classes = []) {
  const element = document.createElement(type);
  classes.forEach((className) => element.classList.add(className));
  return element;
}

// Render a single todo item
function renderTodo(todo, todoList) {
  const todoElement = createElement('div', ['todo']);
  const titleElement = createElement('h2', ['todo-title']);
  const dueDateElement = createElement('p', ['todo-due-date']);
  const priorityElement = createElement('p', ['todo-priority']);
  const detailsElement = createElement('p', ['todo-details']);
  const deleteButton = createElement('button', ['delete-todo']);

  titleElement.textContent = todo.title;
  dueDateElement.textContent = format(new Date(todo.dueDate), 'dd/MM/yyyy');
  priorityElement.textContent = `Priority: ${todo.priority}`;
  detailsElement.textContent = todo.description;
  deleteButton.textContent = 'Delete';

  // Initially hide details and show them when the title is clicked
  detailsElement.style.display = 'none';
  titleElement.addEventListener('click', () => {
    if (detailsElement.style.display === 'none') {
      detailsElement.style.display = 'block';
    } else {
      detailsElement.style.display = 'none';
    }
  });

  // Delete the todo when the delete button is clicked
  deleteButton.addEventListener('click', () => {
    todoList.removeTodo(todo);
    todoElement.remove();
  });

  todoElement.appendChild(titleElement);
  todoElement.appendChild(dueDateElement);
  todoElement.appendChild(priorityElement);
  todoElement.appendChild(detailsElement);
  todoElement.appendChild(deleteButton);

  return todoElement;
}

// Render a list of todos
function renderTodoList(todoList) {
  const todoListElement = createElement('div', ['todo-list']);
  todoList.getAllTodos().forEach((todo) => {
    const todoElement = renderTodo(todo, todoList);
    todoListElement.appendChild(todoElement);
  });
  return todoListElement;
}

// Render a new todo form
function renderNewTodoForm(todoList, project) {
  if (!project) {
    console.error('No project defined');
    return;
  }

  const form = createElement('form', ['new-todo-form']);
  const titleInput = createElement('input', ['title-input']);
  const dueDateInput = createElement('input', ['due-date-input']);
  const priorityInput = createElement('select', ['priority-input']);
  const priorities = ['Low', 'Medium', 'High'];
  const detailsInput = createElement('input', ['details-input']);
  const submitButton = createElement('button', ['submit-button']);

  priorities.forEach((priority) => {
    const option = document.createElement('option');
    option.value = priority;
    option.text = priority;
    priorityInput.appendChild(option);
  });

  titleInput.placeholder = 'Title';
  dueDateInput.placeholder = 'Due date';
  priorityInput.placeholder = 'Priority';
  detailsInput.placeholder = 'Details';
  submitButton.textContent = 'Add todo';

  submitButton.type = 'submit';
  dueDateInput.type = 'date';

  form.appendChild(titleInput);
  form.appendChild(dueDateInput);
  form.appendChild(priorityInput);
  form.appendChild(detailsInput);
  form.appendChild(submitButton);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const description = detailsInput.value;

    if (
      !title.trim() ||
      !dueDate.trim() ||
      !priority.trim() ||
      !description.trim()
    ) {
      alert('Please fill out all fields');
      return;
    }

    todoList.addTodo(title, description, new Date(dueDate), priority);
    renderProject(project);
  });

  return form;
}

// Render a project
export function renderProject(project) {
  root.innerHTML = ''; // Clear the root element

  // Render each todolist in the project
  project.getAllTodoLists().forEach((todoList) => {
    const todoListElement = renderTodoList(todoList);
    root.appendChild(todoListElement);

    const newTodoForm = renderNewTodoForm(todoList, project);
    root.appendChild(newTodoForm);
  });
}
