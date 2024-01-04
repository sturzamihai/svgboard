import DeleteElementEvent from "../events/delete-element.js";
import Tool from "./tool.js";

export default class TrashTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Trash", "media/trash.svg");
  }

  createButton() {
    const button = document.createElement("button");
    button.innerHTML = `<img src="${this.iconSrc}" alt="${this.title}" height="25" width="25"/> `;
    button.addEventListener("click", () => {
      const elements = this.svgBoard.container.querySelectorAll(
        "rect, circle, ellipse, line, polyline, polygon, path, text, image"
      );
      elements.forEach((element) => {
        const deleteEvent = new DeleteElementEvent(this.svgBoard, element);
        this.svgBoard.dispatchEvent(deleteEvent);
      });
    });

    return button;
  }
}
