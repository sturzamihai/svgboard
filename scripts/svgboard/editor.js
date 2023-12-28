export default class SVGBoard {
  constructor(containerId, toolbarId) {
    this.container = document.getElementById(containerId);
    this.toolbar = document.getElementById(toolbarId);

    this.commands = [];
    this.currentCommand = null;
    this.bindEvents();
  }

  addCommand(command) {
    this.commands.push(command);
    this.toolbar.appendChild(command.button);
  }

  setCommand(command) {
    if (this.currentCommand) {
      this.currentCommand.button.classList.remove("active");
    }

    this.currentCommand = command;
  }

  bindEvents() {
    this.container.addEventListener("mousedown", (e) =>
      this.currentCommand?.onMouseDown(e)
    );
    this.container.addEventListener("mousemove", (e) =>
      this.currentCommand?.onMouseMove(e)
    );
    this.container.addEventListener("mouseup", (e) =>
      this.currentCommand?.onMouseUp(e)
    );
    this.container.addEventListener("mouseleave", (e) =>
      this.currentCommand?.onMouseLeave(e)
    );
  }
}
