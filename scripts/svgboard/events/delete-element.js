import Event from "./event.js";

export default class DeleteElementEvent extends Event {
  constructor(svgBoard, shape) {
    super();
    this.svgBoard = svgBoard;
    this.shape = shape;
  }

  do() {
    if (this.shape.length) {
      this.shape.forEach((shape) => {
        this.svgBoard.container.removeChild(shape);
      });
    } else {
      this.svgBoard.container.removeChild(this.shape);
    }
  }

  undo() {
    if (this.shape.length) {
      this.shape.forEach((shape) => {
        this.svgBoard.container.appendChild(shape);
      });
    } else {
      this.svgBoard.container.appendChild(this.shape);
    }
  }
}
