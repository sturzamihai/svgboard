export default class Tool {
  constructor(svgBoard, title, iconSrc) {
    this.svgBoard = svgBoard;
    this.title = title;
    this.iconSrc = iconSrc;
    this.button = this.createButton();
  }

  createButton() {
    const button = document.createElement("button");
    button.innerHTML = `<img src="${this.iconSrc}" alt="${this.title}" height="25" width="25"/> `;
    button.addEventListener("click", () => {
      this.svgBoard.setActiveTool(this);
    });
    return button;
  }

  onMouseDown(event) {}
  onMouseMove(event) {}
  onMouseUp(event) {}
  onMouseLeave(event) {}
  onKeyDown(event) {}
}
