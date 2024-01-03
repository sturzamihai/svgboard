import Tool from "./tool.js";
import DeleteShapeEvent from "../events/delete-shape.js";

export default class SelectTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Selection", "images/select.svg");

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

      if (this.isIntersecting(boundingBox, selectionBox)) {
        element.classList.add("selected");
        this.svgBoard.selectedElements.push(element);
      } else {
        element.classList.remove("selected");
        this.svgBoard.selectedElements = this.svgBoard.selectedElements.filter(
          (selectedElement) => selectedElement !== element
        );
      }
    });

    this.svgBoard.container.removeChild(this.selectionBox);
  }

  isIntersecting(element1, element2) {
    return (
      element1.left < element2.right &&
      element1.right > element2.left &&
      element1.top < element2.bottom &&
      element1.bottom > element2.top
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
