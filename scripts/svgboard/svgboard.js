import Customizer from "./customizer/panel.js";
import EventHistory from "./events/event-history.js";

export default class SVGBoard {
  constructor(containerId, toolbarId, tools) {
    this.container = document.getElementById(containerId);
    this.toolbar = document.getElementById(toolbarId);

    this.selectedElements = [];
    this.tools = [];
    this.activeTool = null;
    this.customizer = new Customizer(this);

    this.initHistory();
    this.addTools(tools);
    this.bindEvents();
    this.loadState();

    this.saveInterval = setInterval(() => this.saveState(), 1000);
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

  initHistory() {
    this.history = new EventHistory();

    const container = document.createElement("div");
    container.id = "history";

    const undoButton = document.createElement("button");
    undoButton.innerHTML = `<img src="images/undo.svg" alt="Undo" height="25" width="25"/> `;
    undoButton.addEventListener("click", () => this.history.undo());

    const redoButton = document.createElement("button");
    redoButton.innerHTML = `<img src="images/redo.svg" alt="Redo" height="25" width="25"/> `;
    redoButton.addEventListener("click", () => this.history.redo());

    container.appendChild(undoButton);
    container.appendChild(redoButton);

    document.body.appendChild(container);
  }

  dispatchEvent(event) {
    this.history.do(event);
  }

  addSelectedElement(element) {
    this.selectedElements.push(element);
    element.classList.add("selected");
    this.customizer.showPanel();
  }

  removeSelectedElement(element) {
    this.selectedElements = this.selectedElements.filter(
      (el) => el !== element
    );
    element.classList.remove("selected");

    if (this.selectedElements.length === 0) {
      this.customizer.hidePanel();
    }
  }

  clearSelectedElements() {
    this.selectedElements.forEach((element) => {
      element.classList.remove("selected");
    });
    this.selectedElements = [];
    this.customizer.hidePanel();
  }

  loadState() {
    const serializedContainer = localStorage.getItem("svgboard");
    if (!serializedContainer) return;

    const parser = new DOMParser();
    const svg = parser.parseFromString(serializedContainer, "image/svg+xml");
    const svgContainer = svg.querySelector("svg");

    this.container.innerHTML = svgContainer.innerHTML;
  }

  saveState() {
    const serializedContainer = new XMLSerializer().serializeToString(
      this.container
    );
    localStorage.setItem("svgboard", serializedContainer);
  }
}
