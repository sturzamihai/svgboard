import EventHistory from "./events/event-history.js";

export default class SVGBoard {
  constructor(containerId, toolbarId, tools) {
    this.container = document.getElementById(containerId);
    this.toolbar = document.getElementById(toolbarId);

    this.history = new EventHistory();
    this.selectedElements = [];
    this.tools = [];
    this.activeTool = null;

    this.addTools(tools);
    this.bindEvents();
  }

  addTools(tools) {
    for (let tool of tools) {
      if (Array.isArray(tool)) {
        const separator = document.createElement("div");
        separator.classList.add("separator");
        this.toolbar.appendChild(separator);
        this.addTools(tool);
        this.toolbar.appendChild(separator.cloneNode(true));
        continue;
      }

      if (typeof tool === "function") {
        tool = new tool(this);
        this.addTool(tool);
      }
    }
  }

  addTool(tool) {
    this.tools.push(tool);
    this.toolbar.appendChild(tool.button);
  }

  setActiveTool(tool) {
    if (this.activeTool) {
      this.activeTool.button.classList.remove("active");
    }

    if (this.activeTool === tool) {
      this.activeTool = null;
      return;
    }

    this.activeTool = tool;
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
