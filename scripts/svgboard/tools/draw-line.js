import Tool from "./tool.js";
import CreateElementEvent from "../events/create-element.js";

export default class DrawLineTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Draw a line", "media/line.svg");

    this.line = null;
    this.previewLine = null;

    this.startX = 0;
    this.startY = 0;
  }

  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.previewLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    this.previewLine.setAttribute("x1", this.startX);
    this.previewLine.setAttribute("y1", this.startY);
    this.previewLine.setAttribute("x2", this.startX);
    this.previewLine.setAttribute("y2", this.startY);
    this.previewLine.setAttribute(
      "stroke",
      this.svgBoard.customizer.stroke.color
    );

    this.svgBoard.container.appendChild(this.previewLine);
  }

  onMouseMove(event) {
    if (!this.previewLine) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    this.previewLine.setAttribute("x2", currentX);
    this.previewLine.setAttribute("y2", currentY);
  }

  onMouseUp(event) {
    if (!this.previewLine) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    if (currentX === this.startX && currentY === this.startY) {
      this.svgBoard.container.removeChild(this.previewLine);
      this.previewLine = null;
      return;
    }

    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.line.setAttribute("x1", this.startX);
    this.line.setAttribute("y1", this.startY);
    this.line.setAttribute("x2", currentX);
    this.line.setAttribute("y2", currentY);
    this.line.setAttribute("stroke", this.svgBoard.customizer.stroke.color);

    const createLine = new CreateElementEvent(this.svgBoard, this.line);
    this.svgBoard.dispatchEvent(createLine);
    this.svgBoard.addSelectedElement(this.line);

    this.svgBoard.container.removeChild(this.previewLine);
    this.previewLine = null;

    this.svgBoard.setActiveTool(null);
    this.button.classList.remove("active");
  }
}
