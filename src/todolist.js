import Todo from './todo';

class TodoList {
  constructor() {
    this.todos = [];
  }

  // Method to add a new todo
  addTodo(title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    this.todos.push(newTodo);
  }

  // Method to remove a todo
  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  // Method to get a specific todo
  getTodo(index) {
    return this.todos[index];
  }

  // Method to get all todos
  getAllTodos() {
    return this.todos;
  }
}

export default TodoList;
