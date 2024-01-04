import CreateElementEvent from "../events/create-element.js";
import Tool from "./tool.js";

export default class DrawCircleTool extends Tool {
  constructor(board, x, y) {
    super(board, "Draw a circle", "images/circle.svg");

    this.circle = null;
    this.previewCircle = null;

    this.startX = x;
    this.startY = y;
  }

  onMouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.previewCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    this.previewCircle.setAttribute("cx", this.startX);
    this.previewCircle.setAttribute("cy", this.startY);
    this.previewCircle.setAttribute("rx", 0);
    this.previewCircle.setAttribute("ry", 0);
    this.previewCircle.setAttribute("fill", this.svgBoard.customizer.background.color);
    this.previewCircle.setAttribute("stroke", this.svgBoard.customizer.stroke.color);

    this.svgBoard.container.appendChild(this.previewCircle);
  }

  onMouseMove(event) {
    if (!this.previewCircle) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const x = (this.startX + currentX) / 2;
    const y = (this.startY + currentY) / 2;
    const rx = Math.abs(this.startX - currentX) / 2;
    const ry = Math.abs(this.startY - currentY) / 2;

    this.previewCircle.setAttribute("cx", x);
    this.previewCircle.setAttribute("cy", y);
    this.previewCircle.setAttribute("rx", rx);
    this.previewCircle.setAttribute("ry", ry);
  }

  onMouseUp(event) {
    if (!this.previewCircle) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const x = (this.startX + currentX) / 2;
    const y = (this.startY + currentY) / 2;
    const rx = Math.abs(this.startX - currentX) / 2;
    const ry = Math.abs(this.startY - currentY) / 2;

    if (rx === 0 || ry === 0) {
      this.svgBoard.container.removeChild(this.previewCircle);
      this.previewCircle = null;
      return;
    }

    this.circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    this.circle.setAttribute("cx", x);
    this.circle.setAttribute("cy", y);
    this.circle.setAttribute("rx", rx);
    this.circle.setAttribute("ry", ry);
    this.circle.setAttribute("fill", this.svgBoard.customizer.background.color);
    this.circle.setAttribute("stroke", this.svgBoard.customizer.stroke.color);

    this.svgBoard.container.removeChild(this.previewCircle);

    const createCircle = new CreateElementEvent(this.svgBoard, this.circle);
    this.svgBoard.dispatchEvent(createCircle);
    this.svgBoard.addSelectedElement(this.circle);

    this.previewCircle = null;

    this.svgBoard.setActiveTool(null);
    this.button.classList.remove("active");
  }
}
