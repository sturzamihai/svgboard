import CreateElementEvent from "../events/create-element.js";
import Tool from "./tool.js";

export default class PenTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Pen", "media/pen.svg");
    this.currentPath = null;

    this.isDrawing = false;
  }

  cleanup() {
    this.currentPath = null;
    this.isDrawing = false;
    this.clearAllHandles();
  }

  onMouseDown(event) {
    const currentPoint = { x: event.clientX, y: event.clientY };

    if (!this.currentPath) {
      if (event.target.tagName === "path") {
        this.currentPath = event.target;
        this.editPath();
        this.svgBoard.addSelectedElement(this.currentPath);
        return;
      }

      this.isDrawing = true;

      this.currentPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      this.currentPath.setAttribute(
        "stroke",
        this.svgBoard.customizer.stroke.color
      );
      this.currentPath.setAttribute(
        "stroke-width",
        this.svgBoard.customizer.stroke.width
      );
      this.currentPath.setAttribute("fill", "none");
      this.currentPath.setAttribute(
        "d",
        `M${currentPoint.x},${currentPoint.y}`
      );

      const createEvent = new CreateElementEvent(
        this.svgBoard,
        this.currentPath
      );
      this.svgBoard.dispatchEvent(createEvent);
    } else if (this.isDrawing) {
      const d = this.currentPath.getAttribute("d");
      this.currentPath.setAttribute(
        "d",
        `${d} L${currentPoint.x},${currentPoint.y}`
      );
    }
  }

  onKeyDown(event) {
    if (event.key === "Escape") {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.editPath();
        this.svgBoard.addSelectedElement(this.currentPath);
      } else {
        this.currentPath = null;
        this.clearAllHandles();
      }
    }
  }

  editPath() {
    const pathData = this.currentPath.getAttribute("d").split(" ");
    const points = pathData
      .map((command) => {
        const [_, cmd, coords] = command.split(/(M|L)/);
        if (coords) {
          const [x, y] = coords.split(",").map(Number);
          return { x, y };
        }
        return null;
      })
      .filter((p) => p);

    points.forEach((point, index) => {
      this.addDraggablePoint(point, index);
    });
  }

  addDraggablePoint(point, index) {
    const handle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    handle.setAttribute("cx", point.x);
    handle.setAttribute("cy", point.y);
    handle.setAttribute("r", 4);
    handle.setAttribute("fill", "blue");
    handle.setAttribute("stroke", "white");
    handle.setAttribute("stroke-width", 2);
    handle.setAttribute("path-point", true);
    handle.setAttribute("point-index", index);
    handle.setAttribute("editor-ignore", true);
    handle.setAttribute(
      "transform",
      this.currentPath.getAttribute("transform")
    );

    this.svgBoard.container.appendChild(handle);
    this.makeHandleDraggable(handle);
  }

  clearAllHandles() {
    const handles = this.svgBoard.container.querySelectorAll(
      "[path-point='true']"
    );
    handles.forEach((handle) => this.svgBoard.container.removeChild(handle));
  }

  makeHandleDraggable(handle) {
    let isDragging = false;
    let startX, startY;
    let pathDefs;

    const onMouseMove = (event) => {
      if (!isDragging) return;

      const currentX = event.clientX;
      const currentY = event.clientY;

      const dx = currentX - startX;
      const dy = currentY - startY;

      const cx = Number(handle.getAttribute("cx"));
      const cy = Number(handle.getAttribute("cy"));

      handle.setAttribute("cx", cx + dx);
      handle.setAttribute("cy", cy + dy);

      let pathData = this.currentPath.getAttribute("d").split(" ");
      const index = Number(handle.getAttribute("point-index"));

      pathData[index] = `${pathData[index].charAt(0)}${cx + dx},${cy + dy}`;
      this.currentPath.setAttribute("d", pathData.join(" "));

      startX = currentX;
      startY = currentY;
    };

    handle.addEventListener("mousedown", (event) => {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      pathDefs = this.currentPath.getAttribute("d");

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener(
        "mouseup",
        () => {
          isDragging = false;
          window.removeEventListener("mousemove", onMouseMove);
          const changeEvent = new ChangeElementEvent(
            this.currentPath,
            {
              path: this.currentPath.getAttribute("d"),
            },
            {
              path: pathDefs,
            }
          );
          this.svgBoard.dispatchEvent(changeEvent);
        },
        { once: true }
      );
    });
  }
}
