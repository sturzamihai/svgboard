import ChangeElementEvent from "../events/change-element.js";
import ColorPicker from "./color-picker.js";
import StrokePicker from "./stroke-picker.js";

export default class Customizer {
  constructor(svgBoard) {
    this.svgBoard = svgBoard;

    this.background = new ColorPicker(
      ["#ffffff", "#000000", "#ff0000", "#00ff00", "transparent"],
      this.changeSelectedElementsColor.bind(this)
    );
    this.stroke = new StrokePicker(
      ["#000000", "#ffffff", "transparent"],
      this.changeSelectedElementsStroke.bind(this),
      this.changeSelectedElementsStrokeWidth.bind(this)
    );

    this.initPanel();
  }

  initPanel() {
    this.panel = document.createElement("div");
    this.panel.id = "customizer";

    const backgroundContainer = document.createElement("div");
    const backgroundHeading = document.createElement("h4");
    backgroundHeading.innerText = "Background";
    backgroundContainer.appendChild(backgroundHeading);
    backgroundContainer.appendChild(this.background.createInputs());
    this.panel.appendChild(backgroundContainer);

    const strokeContainer = document.createElement("div");
    const strokeHeading = document.createElement("h4");
    strokeHeading.innerText = "Stroke";
    strokeContainer.appendChild(strokeHeading);
    strokeContainer.appendChild(this.stroke.createInputs());
    this.panel.appendChild(strokeContainer);

    document.body.appendChild(this.panel);
  }

  showPanel() {
    this.panel.classList.add("show");
    const selectedFillColor = this.svgBoard.selectedElements.length === 1 ? this.svgBoard.selectedElements[0].getAttribute("fill") : null;
    const selectedStrokeColor = this.svgBoard.selectedElements.length === 1 ? this.svgBoard.selectedElements[0].getAttribute("stroke") : null;

    this.background.setColor(selectedFillColor);
    this.stroke.setColor(selectedStrokeColor);
  }

  hidePanel() {
    this.panel.classList.remove("show");
  }

  changeSelectedElementsColor(color) {
    this.svgBoard.selectedElements.forEach((element) => {
      const changeEvent = new ChangeElementEvent(element, {
        fill: color,
      });
      this.svgBoard.dispatchEvent(changeEvent);
    });
  }

  changeSelectedElementsStroke(color) {
    this.svgBoard.selectedElements.forEach((element) => {
      const changeEvent = new ChangeElementEvent(element, {
        stroke: color,
      });
      this.svgBoard.dispatchEvent(changeEvent);
    });
  }

  changeSelectedElementsStrokeWidth(width) {
    this.svgBoard.selectedElements.forEach((element) => {
      const changeEvent = new ChangeElementEvent(element, {
        strokeWidth: width,
      });
      this.svgBoard.dispatchEvent(changeEvent);
    });
  }
}
