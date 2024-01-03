import Event from "./event.js";

export default class ChangeElementEvent extends Event {
  constructor(
    selectedElement,
    changes = {
      fill: null,
      stroke: null,
      strokeWidth: null,
      transform: null,
    },
    initial = {
      fill: null,
      stroke: null,
      strokeWidth: null,
      transform: null,
    }
  ) {
    super();
    this.selectedElement = selectedElement;

    this.initialFill = initial.fill || selectedElement.getAttribute("fill");
    this.initialStroke = initial.stroke || selectedElement.getAttribute("stroke");
    this.initialStrokeWidth = initial.strokeWidth || selectedElement.getAttribute("stroke-width");
    this.initialTransform = initial.transform || selectedElement.getAttribute("transform");

    this.newFill = changes.fill || this.initialFill;
    this.newStroke = changes.stroke || this.initialStroke;
    this.newStrokeWidth = changes.strokeWidth || this.initialStrokeWidth;
    this.newTransform = changes.transform || this.initialTransform;
  }

  do() {
    this.selectedElement.setAttribute("fill", this.newFill);
    this.selectedElement.setAttribute("stroke", this.newStroke);
    this.selectedElement.setAttribute("stroke-width", this.newStrokeWidth);
    this.selectedElement.setAttribute("transform", this.newTransform);
  }

  undo() {
    this.selectedElement.setAttribute("fill", this.initialFill);
    this.selectedElement.setAttribute("stroke", this.initialStroke);
    this.selectedElement.setAttribute("stroke-width", this.initialStrokeWidth);
    this.selectedElement.setAttribute("transform", this.initialTransform);
  }
}
