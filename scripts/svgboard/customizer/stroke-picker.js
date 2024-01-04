import ColorPicker from "./color-picker.js";

export default class StrokePicker extends ColorPicker {
  constructor(presets, onColorChange, onStrokeChange) {
    super(presets, onColorChange);
    this.onStrokeChange = onStrokeChange;
    this.stroke = 1.5;
  }

  createInputs() {
    const container = super.createInputs();

    const strokeContainer = document.createElement("div");
    strokeContainer.classList.add("stroke-picker");

    const strokeInput = document.createElement("input");
    strokeInput.type = "range";
    strokeInput.min = 1;
    strokeInput.max = 10;
    strokeInput.value = this.stroke;
    strokeInput.addEventListener("change", () => {
      this.stroke = strokeInput.value;
      this.onStrokeChange(strokeInput.value);
    });
    strokeContainer.appendChild(strokeInput);

    container.appendChild(strokeContainer);

    return container;
  }
}
