import Event from "./event.js";

export default class DeleteShapeEvent extends Event {
    constructor(svgBoard, shape) {
        super();
        this.svgBoard = svgBoard;
        this.shape = shape;
    }
    
    do() {
        this.svgBoard.container.removeChild(this.shape);
    }
    
    undo() {
        this.svgBoard.container.appendChild(this.shape);
    }
}