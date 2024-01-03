import ChangeElementEvent from "../events/change-element.js";
import Tool from "./tool.js";

export default class MoveTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Move", "images/move.svg");

    this.selectedElement = null;
    this.startX = 0;
    this.startY = 0;
  }

  onMouseDown(event) {
    const target = event.target;
    if (target === this.svgBoard.container) return;

    this.selectedElement = target;
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.initialTransform =
      this.selectedElement.getAttribute("transform") || "";
  }

  onMouseMove(event) {
    if (!this.selectedElement) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const dx = currentX - this.startX;
    const dy = currentY - this.startY;

    const transform =
      this.selectedElement.getAttribute("transform") || "translate(0, 0)";
    const translate = transform.replace(
      /translate\((.*),(.*)\)/,
      (match, p1, p2) => {
        return `translate(${Number(p1) + dx}, ${Number(p2) + dy})`;
      }
    );

    this.selectedElement.setAttribute("transform", translate);

    this.startX = currentX;
    this.startY = currentY;
  }

  onMouseUp(event) {
    if (!this.selectedElement) return;

    const moveEvent = new ChangeElementEvent(
      this.selectedElement,
      {
        transform: this.selectedElement.getAttribute("transform"),
      },
      {
        transform: this.initialTransform,
      }
    );
    this.svgBoard.dispatchEvent(moveEvent);

    this.selectedElement = null;
  }
}
