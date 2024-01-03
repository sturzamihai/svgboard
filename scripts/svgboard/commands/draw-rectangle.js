import Command from "./command.js";

export default class DrawRectangle extends Command {
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
    this.previewRectangle.setAttribute("fill", "transparent");
    this.previewRectangle.setAttribute("stroke", "red");

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

    this.rectangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    this.rectangle.setAttribute("x", x);
    this.rectangle.setAttribute("y", y);
    this.rectangle.setAttribute("width", width);
    this.rectangle.setAttribute("height", height);
    this.rectangle.setAttribute("fill", "red");
    this.rectangle.setAttribute("stroke", "transparent");

    this.svgBoard.container.appendChild(this.rectangle);

    this.svgBoard.container.removeChild(this.previewRectangle);
    this.previewRectangle = null;

    this.svgBoard.setCommand(null);
    this.button.classList.remove("active");
  }
}
