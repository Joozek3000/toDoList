import { isToday, isThisWeek, isThisMonth } from 'date-fns';

function createElement(type, classes = []) {
  const element = document.createElement(type);
  classes.forEach((className) => element.classList.add(className));
  return element;
}

export function updateDisplayedTodos(project, menuItem) {
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
}

export function renderMenu(project) {
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
      updateDisplayedTodos(project, item); // Update the displayed todos when a menu item is clicked
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
