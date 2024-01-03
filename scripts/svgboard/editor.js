import EventHistory from "./events/event-history.js";

export default class SVGBoard {
  constructor(containerId, toolbarId) {
    this.container = document.getElementById(containerId);
    this.toolbar = document.getElementById(toolbarId);

    this.history = new EventHistory();

    this.selectedElements = [];
    this.tools = [];
    this.activeTool = null;
    this.bindEvents();
  }

  addTool(command) {
    this.tools.push(command);
    this.toolbar.appendChild(command.button);
  }

  setActiveTool(command) {
    if (this.activeTool) {
      this.activeTool.button.classList.remove("active");
    }

    if (this.activeTool === command) {
      this.activeTool = null;
      return;
    }

    this.activeTool = command;
  }

  bindEvents() {
    this.container.addEventListener("mousedown", (e) =>
      this.activeTool?.onMouseDown(e)
    );
    this.container.addEventListener("mousemove", (e) =>
      this.activeTool?.onMouseMove(e)
    );
    this.container.addEventListener("mouseup", (e) =>
      this.activeTool?.onMouseUp(e)
    );
    this.container.addEventListener("mouseleave", (e) =>
      this.activeTool?.onMouseLeave(e)
    );
    window.addEventListener("keydown", (e) => this.activeTool?.onKeyDown(e));
  }
}
