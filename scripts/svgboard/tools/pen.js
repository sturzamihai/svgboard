import Tool from "./tool.js";

export default class PenTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Pen", "images/pen.svg");
    this.currentPath = null;
  }

  onMouseDown(event) {
    this.currentPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.currentPath.setAttribute("fill", "none");
    this.currentPath.setAttribute(
      "stroke",
      this.svgBoard.customizer.stroke.color
    );
    this.currentPath.setAttribute(
      "stroke-width",
      this.svgBoard.customizer.stroke.width
    );

    this.currentPath.setAttribute("d", `M ${event.clientX} ${event.clientY}`);

    this.svgBoard.container.appendChild(this.currentPath);
  }

  onMouseMove(event) {
    if (!this.currentPath) return;

    const d = this.currentPath.getAttribute("d");
    this.currentPath.setAttribute(
      "d",
      `${d} L ${event.clientX} ${event.clientY}`
    );
  }

  onMouseUp(event) {
    if (!this.currentPath) return;

    this.currentPath = null;
  }
}
