import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import './styles.css';

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

function updateDisplayedTodos(menuItem) {
  // Get today's date
  const today = new Date();

  let filteredTodos;

  // Filter the todos based on the selected menu item
  switch (menuItem) {
    case 'Today':
      // Get the todos due today
      filteredTodos = project
        .getAllTodoLists()
        .flatMap((list) => list.getAllTodos())
        .filter((todo) => isToday(new Date(todo.dueDate)));
      break;
    case 'This Week':
      // Get the todos due this week
      filteredTodos = project
        .getAllTodoLists()
        .flatMap((list) => list.getAllTodos())
        .filter((todo) => isThisWeek(new Date(todo.dueDate)));
      break;
    case 'This Month':
      // Get the todos due this month
      filteredTodos = project
        .getAllTodoLists()
        .flatMap((list) => list.getAllTodos())
        .filter((todo) => isThisMonth(new Date(todo.dueDate)));
      break;
    default:
      // By default, show all todos
      filteredTodos = project
        .getAllTodoLists()
        .flatMap((list) => list.getAllTodos());
  }

  // Clear the current todos
  const todoContainer = document.querySelector('.todo-container');
  todoContainer.innerHTML = '';

  // Render the filtered todos
  filteredTodos.forEach((todo) => {
    const todoElement = renderTodo(todo);
    todoContainer.appendChild(todoElement);
  });
}

/// Render a list of todos
function renderTodoList(todoList) {
  const todoContainer = createElement('div', ['todo-container']); // Create a container for todos
  todoList.getAllTodos().forEach((todo) => {
    const todoElement = renderTodo(todo, todoList);
    todoContainer.appendChild(todoElement); // Append each todo element to the container
  });
  return todoContainer; // Return the container
}

// Render a new todo form
function renderNewTodoForm(project) {
  if (!project) {
    console.error('No project defined');
    return;
  }

  const form = createElement('form', ['new-todo-form']); // Create a form element with 'new-todo-form' class
  const titleInput = createElement('input', ['title-input']); // Create an input element for the title with 'title-input' class
  const dueDateInput = createElement('input', ['due-date-input']); // Create an input element for the due date with 'due-date-input' class
  const priorityInput = createElement('select', ['priority-input']); // Create a select element for the priority with 'priority-input' class
  const priorities = ['Low', 'Medium', 'High']; // Define the available priority options
  const detailsInput = createElement('input', ['details-input']); // Create an input element for the details with 'details-input' class
  const submitButton = createElement('button', ['submit-button']); // Create a button element for submitting the form with 'submit-button' class

  // Create modal and modal content
  const modal = createElement('div', ['modal']); // Create a div element for the modal with 'modal' class
  const modalContent = createElement('div', ['modal-content']); // Create a div element for the modal content with 'modal-content' class

  // Append the form to the modal content
  modalContent.appendChild(form);
  modal.appendChild(modalContent);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Create option elements for each priority and append them to the priority select element
  priorities.forEach((priority) => {
    const option = document.createElement('option');
    option.value = priority;
    option.text = priority;
    priorityInput.appendChild(option);
  });

  titleInput.placeholder = 'Title'; // Set the placeholder text for the title input
  dueDateInput.placeholder = 'Due date'; // Set the placeholder text for the due date input
  priorityInput.placeholder = 'Priority'; // Set the placeholder text for the priority select element
  detailsInput.placeholder = 'Details'; // Set the placeholder text for the details input
  submitButton.textContent = 'Add todo'; // Set the text content of the submit button

  submitButton.type = 'submit'; // Set the type of the submit button to 'submit'
  dueDateInput.type = 'date'; // Set the type of the due date input to 'date'

  form.appendChild(titleInput); // Append the title input to the form
  form.appendChild(dueDateInput); // Append the due date input to the form
  form.appendChild(priorityInput); // Append the priority select element to the form
  form.appendChild(detailsInput); // Append the details input to the form
  form.appendChild(submitButton); // Append the submit button to the form

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value; // Get the value of the title input
    const dueDate = dueDateInput.value; // Get the value of the due date input
    const priority = priorityInput.value; // Get the value of the priority select element
    const description = detailsInput.value; // Get the value of the details input

    if (
      !title.trim() || // Check if the title is empty or contains only whitespace
      !dueDate.trim() || // Check if the due date is empty or contains only whitespace
      !priority.trim() || // Check if the priority is empty or contains only whitespace
      !description.trim() // Check if the description is empty or contains only whitespace
    ) {
      alert('Please fill out all fields'); // Display an alert message if any field is empty
      return;
    }

    // Here you would need to add the new todo to the appropriate list in the project
    // You could ask the user for the list to which they want to add the new todo, or just add it to the first list in the project
    const todoList = project.getAllTodoLists()[0]; // This is just an example, replace with your own logic
    todoList.addTodo(title, description, new Date(dueDate), priority); // Add the new todo to the todo list
    renderProject(project); // Render the updated project
  });

  return modal; // Return the modal element
}

// Render an add button
function renderAddButton() {
  const addButton = createElement('button', ['add-button']);
  addButton.textContent = '+';
  addButton.addEventListener('click', () => {
    // Find the modal and display it when the add button is clicked
    const modal = document.querySelector('.modal');
    if (modal) {
      console.log('Modal found');
      modal.style.display = 'block';
    } else {
      console.log('Modal not found');
    }
  });
  console.log('Add button created');
  return addButton;
}

// Render a project
export function renderProject(project) {
  root.innerHTML = ''; // Clear the root element

  // Create a header element
  const header = createElement('header', ['app-header', 'black-header']);
  const title = createElement('h1', ['app-title']);
  title.textContent = 'Todo';
  header.appendChild(title);
  root.appendChild(header);

  // Render the menu and append it to the root
  const menu = renderMenu();
  root.appendChild(menu);

  // Render each todo list in the project
  project.getAllTodoLists().forEach((todoList) => {
    const todoListElement = renderTodoList(todoList);
    root.appendChild(todoListElement);
  });

  const newTodoForm = renderNewTodoForm(project);
  root.appendChild(newTodoForm);

  // Render the add button and append it to the root
  const addButton = renderAddButton();
  root.appendChild(addButton);

  // Render the menu
  renderMenu();
}

function renderMenu() {
  // Create a menu container
  const menuContainer = createElement('div', ['menu-container']);

  // Set the initial left property of the menu container
  menuContainer.style.left = '-200px';

  // Create a list for the menu items
  const menuList = createElement('ul', ['menu-list']);

  // Define the menu items
  const menuItems = ['Today', 'This Week', 'This Month'];

  // Create each menu item and append it to the menu list
  menuItems.forEach((item) => {
    const menuItem = createElement('li', ['menu-item']);
    const link = createElement('a', ['menu-link']);
    link.textContent = item;
    link.href = '#';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      updateDisplayedTodos(item); // Update the displayed todos when a menu item is clicked
    });
    menuItem.appendChild(link);
    menuList.appendChild(menuItem);
  });

  // Append the menu list to the menu container
  menuContainer.appendChild(menuList);

  // Create the menu button as a separate fixed element
  const menuButton = createElement('button', ['menu-button']);
  menuButton.textContent = '☰';

  // Set the initial left property of the menu button
  menuButton.style.left = '0px';

  menuButton.addEventListener('click', () => {
    const expanded = menuContainer.style.left === '0px';
    menuContainer.style.left = expanded ? '-200px' : '0px';
    menuButton.style.left = expanded ? '0px' : '200px';
  });

  // Append the menu button to the menu container
  menuContainer.appendChild(menuButton);

  // Return the menu container
  return menuContainer;
}
