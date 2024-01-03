export default class Command {
  constructor(svgBoard, title, iconSrc) {
    this.svgBoard = svgBoard;
    this.title = title;
    this.iconSrc = iconSrc;
    this.button = this.createButton();
  }

  createButton() {
    const button = document.createElement("button");
    button.innerHTML = `<img src="${this.iconSrc}" alt="${this.title}"/>`;
    button.addEventListener("click", () => {
      button.classList.add("active");
      this.svgBoard.setCommand(this);
    });
    return button;
  }

  onMouseDown(event) {}
  onMouseMove(event) {}
  onMouseUp(event) {}
  onMouseLeave(event) {}
}
