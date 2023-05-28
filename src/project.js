import TodoList from './todolist';

class Project {
  constructor() {
    this.todoLists = [];
  }

  // Method to add a new todolist
  addTodoList() {
    const newTodoList = new TodoList();
    this.todoLists.push(newTodoList);
  }

  // Method to remove a todolist
  removeTodoList(index) {
    this.todoLists.splice(index, 1);
  }

  // Method to get a specific todolist
  getTodoList(index) {
    return this.todoLists[index];
  }

  // Method to get all todolists
  getAllTodoLists() {
    return this.todoLists;
  }
}

export default Project;
