// The Todo class
class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  // A method to toggle the complete status
  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  // Methods to update the todo
  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updateDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  updatePriority(priority) {
    this.priority = priority;
  }
}

export default Todo;
