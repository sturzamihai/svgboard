import Tool from "./tool.js";
import CreateElementEvent from "../events/create-element.js";

export default class DrawRectangleTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Draw a rectangle", "images/rectangle.svg");

    this.rectangle = null;
    this.previewRectangle = null;

    this.startX = 0;
    this.startY = 0;
  }

  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.previewRectangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    this.previewRectangle.setAttribute("x", this.startX);
    this.previewRectangle.setAttribute("y", this.startY);
    this.previewRectangle.setAttribute("width", 0);
    this.previewRectangle.setAttribute("height", 0);
    this.previewRectangle.setAttribute(
      "fill",
      this.svgBoard.customizer.background.color
    );
    this.previewRectangle.setAttribute(
      "stroke",
      this.svgBoard.customizer.stroke.color
    );

    this.svgBoard.container.appendChild(this.previewRectangle);
  }

  onMouseMove(event) {
    if (!this.previewRectangle) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const x = Math.min(this.startX, currentX);
    const y = Math.min(this.startY, currentY);
    const width = Math.abs(this.startX - currentX);
    const height = Math.abs(this.startY - currentY);

    this.previewRectangle.setAttribute("x", x);
    this.previewRectangle.setAttribute("y", y);
    this.previewRectangle.setAttribute("width", width);
    this.previewRectangle.setAttribute("height", height);
  }

  onMouseUp(event) {
    if (!this.previewRectangle) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const x = Math.min(this.startX, currentX);
    const y = Math.min(this.startY, currentY);
    const width = Math.abs(this.startX - currentX);
    const height = Math.abs(this.startY - currentY);

    if (width === 0 || height === 0) {
      this.svgBoard.container.removeChild(this.previewRectangle);
      this.previewRectangle = null;
      return;
    }

    this.rectangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    this.rectangle.setAttribute("x", x);
    this.rectangle.setAttribute("y", y);
    this.rectangle.setAttribute("width", width);
    this.rectangle.setAttribute("height", height);
    this.rectangle.setAttribute(
      "fill",
      this.svgBoard.customizer.background.color
    );
    this.rectangle.setAttribute(
      "stroke",
      this.svgBoard.customizer.stroke.color
    );

    const createRectangle = new CreateElementEvent(
      this.svgBoard,
      this.rectangle
    );
    this.svgBoard.dispatchEvent(createRectangle);
    this.svgBoard.addSelectedElement(this.rectangle);

    this.svgBoard.container.removeChild(this.previewRectangle);
    this.previewRectangle = null;

    this.svgBoard.setActiveTool(null);
    this.button.classList.remove("active");
  }
}
