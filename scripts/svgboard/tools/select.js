import Tool from "./tool.js";
import DeleteShapeEvent from "../events/delete-shape.js";

export default class SelectTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Select", "images/select.svg");

    this.selectionBox = null;
    this.startX = 0;
    this.startY = 0;
  }

  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.selectionBox = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    this.selectionBox.setAttribute("x", this.startX);
    this.selectionBox.setAttribute("y", this.startY);
    this.selectionBox.setAttribute("width", 0);
    this.selectionBox.setAttribute("height", 0);
    this.selectionBox.setAttribute("fill", "transparent");
    this.selectionBox.setAttribute("stroke", "black");
    this.selectionBox.setAttribute("stroke-dasharray", 4);

    this.svgBoard.container.appendChild(this.selectionBox);
  }

  onMouseMove(event) {
    if (!this.selectionBox) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const x = Math.min(this.startX, currentX);
    const y = Math.min(this.startY, currentY);
    const width = Math.abs(this.startX - currentX);
    const height = Math.abs(this.startY - currentY);

    this.selectionBox.setAttribute("x", x);
    this.selectionBox.setAttribute("y", y);
    this.selectionBox.setAttribute("width", width);
    this.selectionBox.setAttribute("height", height);
  }

  onMouseUp(event) {
    const elements = this.svgBoard.container.querySelectorAll(
      "rect, ellipse, line, path"
    );

    elements.forEach((element) => {
      if (element === this.selectionBox) return;

      const boundingBox = element.getBoundingClientRect();
      const selectionBox = this.selectionBox.getBoundingClientRect();

      if (this.isContained(boundingBox, selectionBox)) {
        this.svgBoard.addSelectedElement(element);
      } else {
        this.svgBoard.removeSelectedElement(element);
      }
    });

    this.svgBoard.container.removeChild(this.selectionBox);
    this.selectionBox = null;
  }

  onMouseLeave(event) {
    if (!this.selectionBox) return;

    this.svgBoard.container.removeChild(this.selectionBox);
    this.selectionBox = null;
  }

  isContained(element1, element2) {
    return (
      element1.left >= element2.left &&
      element1.right <= element2.right &&
      element1.top >= element2.top &&
      element1.bottom <= element2.bottom
    );
  }

  onKeyDown(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      this.svgBoard.selectedElements.forEach((element) => {
        console.log(element);
        const deleteEvent = new DeleteShapeEvent(this.svgBoard, element);
        this.svgBoard.history.do(deleteEvent);
      });

      this.svgBoard.selectedElements = [];
    }
  }
}
