import Project from './project';

const project = new Project();

// Add a new todolist to the project
project.addTodoList();

// Get the first todolist
const todoList = project.getTodoList(0);

// Add todos to the todolist
todoList.addTodo('Do laundry', 'Wash the clothes', new Date(), 'High');
todoList.addTodo(
  'Do homework',
  'Complete the math assignment',
  new Date(),
  'Medium'
);

// Import and call the render function
import { renderProject, setProject } from './ui';
setProject(project); // set project in UI module
renderProject(project); // initial render
