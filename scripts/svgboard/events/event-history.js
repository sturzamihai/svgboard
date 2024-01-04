export default class EventHistory {
  constructor() {
    this.history = [];
    this.future = [];
  }

  do(event) {
    this.history.push(event);
    this.future = [];

    event.do();
  }

  undo() {
    if (this.history.length > 0) {
      const action = this.history.pop();
      this.future.push(action);
      action.undo();
    }
  }

  redo() {
    if (this.future.length > 0) {
      const action = this.future.pop();
      this.history.push(action);
      action.do();
    }
  }

  clear() {
    this.history = [];
    this.future = [];
  }
}
