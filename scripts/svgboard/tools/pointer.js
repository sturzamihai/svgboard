import Tool from "./tool.js";
import ChangeElementEvent from "../events/change-element.js";

export default class PointerTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Pointer", "images/pointer.svg");

    this.startX = 0;
    this.startY = 0;
    this.selectionBox = null;
    this.initialTransforms = [];
    this.isDragging = false;
    this.multipleBox = null;
  }

  onMouseDown(event) {
    const target = event.target;

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.isDragging = false;

    if (target === this.svgBoard.container) {
      if (this.multipleBox) {
        this.svgBoard.container.removeChild(this.multipleBox);
        this.multipleBox = null;
      }

      this.svgBoard.clearSelectedElements();
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
    } else if (target.getAttribute("select-box") === "true") {
      this.svgBoard.selectedElements.forEach((element) => {
        this.initialTransforms.push(element.getAttribute("transform") || "");
      });
    } else {
      if (this.multipleBox) {
        this.svgBoard.container.removeChild(this.multipleBox);
        this.multipleBox = null;
      }

      this.svgBoard.clearSelectedElements();
      this.svgBoard.addSelectedElement(target);

      this.initialTransforms.push(target.getAttribute("transform") || "");
    }
  }

  onMouseMove(event) {
    if (this.selectionBox) {
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
    } else if (event.buttons === 1) {
      this.isDragging = true;
      const currentX = event.clientX;
      const currentY = event.clientY;

      const dx = currentX - this.startX;
      const dy = currentY - this.startY;

      this.svgBoard.selectedElements.forEach((element) => {
        this.updateTransforms(element, dx, dy);
      });

      if (this.multipleBox) {
        this.updateTransforms(this.multipleBox, dx, dy);
      }

      this.startX = currentX;
      this.startY = currentY;
    }
  }

  onMouseUp(event) {
    if (this.selectionBox) {
      const elements = this.svgBoard.container.querySelectorAll(
        "rect, ellipse, line, path"
      );

      const selectionBoundingBox = this.selectionBox.getBoundingClientRect();

      const aggregateBoundingBox = {
        x1: Infinity,
        y1: Infinity,
        x2: 0,
        y2: 0,
      };

      elements.forEach((element) => {
        if (element === this.selectionBox) return;
        const boundingBox = element.getBoundingClientRect();

        if (this.isContained(boundingBox, selectionBoundingBox)) {
          this.svgBoard.addSelectedElement(element);

          aggregateBoundingBox.x1 = Math.min(
            aggregateBoundingBox.x1,
            boundingBox.x
          );
          aggregateBoundingBox.y1 = Math.min(
            aggregateBoundingBox.y1,
            boundingBox.y
          );
          aggregateBoundingBox.x2 = Math.max(
            aggregateBoundingBox.x2,
            boundingBox.x + boundingBox.width
          );
          aggregateBoundingBox.y2 = Math.max(
            aggregateBoundingBox.y2,
            boundingBox.y + boundingBox.height
          );
        } else {
          this.svgBoard.removeSelectedElement(element);
        }
      });

      this.svgBoard.container.removeChild(this.selectionBox);
      this.selectionBox = null;

      if (this.svgBoard.selectedElements.length > 1) {
        this.multipleBox = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        this.multipleBox.setAttribute("x", aggregateBoundingBox.x1 - 5);
        this.multipleBox.setAttribute("y", aggregateBoundingBox.y1 - 5);
        this.multipleBox.setAttribute(
          "width",
          aggregateBoundingBox.x2 - aggregateBoundingBox.x1 + 10
        );
        this.multipleBox.setAttribute(
          "height",
          aggregateBoundingBox.y2 - aggregateBoundingBox.y1 + 10
        );
        this.multipleBox.setAttribute("fill", "transparent");
        this.multipleBox.setAttribute("stroke", "black");
        this.multipleBox.setAttribute("stroke-dasharray", 4);
        this.multipleBox.setAttribute("select-box", true);

        this.svgBoard.container.appendChild(this.multipleBox);
      }
    } else if (this.isDragging) {
      this.svgBoard.selectedElements.forEach((element, index) => {
        const moveEvent = new ChangeElementEvent(
          element,
          {
            transform: element.getAttribute("transform"),
          },
          {
            transform: this.initialTransforms[index],
          }
        );
        this.svgBoard.dispatchEvent(moveEvent);
      });

      this.initialTransforms = [];
      this.svgBoard.clearSelectedElements();
      this.isDragging = false;

      if (this.multipleBox) {
        this.svgBoard.container.removeChild(this.multipleBox);
        this.multipleBox = null;
      }
    }
  }

  onMouseLeave(event) {
    if (this.selectionBox) {
      this.svgBoard.container.removeChild(this.selectionBox);
      this.selectionBox = null;
    }
  }

  isContained(element1, element2) {
    return (
      element1.left >= element2.left &&
      element1.right <= element2.right &&
      element1.top >= element2.top &&
      element1.bottom <= element2.bottom
    );
  }

  updateTransforms(element, dx, dy) {
    const transform = element.getAttribute("transform") || "translate(0, 0)";
    const translate = transform.replace(
      /translate\((.*),(.*)\)/,
      (match, p1, p2) => {
        return `translate(${Number(p1) + dx}, ${Number(p2) + dy})`;
      }
    );

    element.setAttribute("transform", translate);
  }

  onKeyDown(event) {
    if (event.key === "Escape") {
      if (this.selectionBox) {
        this.svgBoard.container.removeChild(this.selectionBox);
        this.selectionBox = null;
      }

      if (this.multipleBox) {
        this.svgBoard.container.removeChild(this.multipleBox);
        this.multipleBox = null;
      }

      this.svgBoard.clearSelectedElements();
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      if (document.activeElement.tagName === "INPUT") return;

      this.svgBoard.selectedElements.forEach((element) => {
        this.svgBoard.container.removeChild(element);
      });

      this.svgBoard.clearSelectedElements();
    }
  }
}
