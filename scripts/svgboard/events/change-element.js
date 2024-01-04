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
    this.initialStroke =
      initial.stroke || selectedElement.getAttribute("stroke");
    this.initialStrokeWidth =
      initial.strokeWidth || selectedElement.getAttribute("stroke-width");
    this.initialTransform =
      initial.transform || selectedElement.getAttribute("transform");

    this.newFill = changes.fill || this.initialFill;
    this.newStroke = changes.stroke || this.initialStroke;
    this.newStrokeWidth = changes.strokeWidth || this.initialStrokeWidth;
    this.newTransform = changes.transform || this.initialTransform;
  }

  do() {
    if (this.newFill) this.selectedElement.setAttribute("fill", this.newFill);
    if (this.newStroke)
      this.selectedElement.setAttribute("stroke", this.newStroke);
    if (this.newStrokeWidth)
      this.selectedElement.setAttribute("stroke-width", this.newStrokeWidth);
    if (this.newTransform)
      this.selectedElement.setAttribute("transform", this.newTransform);
  }

  undo() {
    if (this.initialFill)
      this.selectedElement.setAttribute("fill", this.initialFill);
    if (this.initialStroke)
      this.selectedElement.setAttribute("stroke", this.initialStroke);
    if (this.initialStrokeWidth)
      this.selectedElement.setAttribute(
        "stroke-width",
        this.initialStrokeWidth
      );
    if (this.initialTransform)
      this.selectedElement.setAttribute("transform", this.initialTransform);
  }
}
