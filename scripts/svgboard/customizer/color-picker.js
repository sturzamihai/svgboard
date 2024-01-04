export default class ColorPicker {
  constructor(presets, onColorChange) {
    this.presets = presets;
    this.onColorChange = onColorChange;
    this.color = presets[0];
  }

  createInputs() {
    const container = document.createElement("div");
    container.classList.add("color-picker");

    const presetsContainer = document.createElement("div");
    presetsContainer.classList.add("color-presets");

    this.presets.forEach((preset) => {
      const presetButton = document.createElement("button");
      presetButton.classList.add("preset");
      presetButton.style.backgroundColor = preset;
      if (preset === "transparent") {
        presetButton.innerHTML = `<img src="images/none.svg" alt="transparent" height="15" width="15"/> `;
      }
      presetButton.addEventListener("click", () => {
        this.color = preset;
        this.onColorChange(preset);
      });
      presetsContainer.appendChild(presetButton);
    });

    const customColorContainer = document.createElement("div");
    customColorContainer.classList.add("custom-color");

    this.colorPreview = document.createElement("div");
    this.colorPreview.classList.add("preview");

    this.colorInput = document.createElement("input");
    this.colorInput.value = this.color;

    this.colorInput.addEventListener("change", () => {
      this.colorPreview.style.backgroundColor = this.colorInput.value;
      this.color = this.colorInput.value;
      this.onColorChange(this.colorInput.value);
    });
    customColorContainer.appendChild(this.colorPreview);
    customColorContainer.appendChild(this.colorInput);

    container.appendChild(presetsContainer);
    container.appendChild(customColorContainer);

    return container;
  }

  setColor(color) {
    if(!this.colorInput) return;

    this.colorInput.value = color;
    this.colorPreview.style.backgroundColor = color === "null" ? "transparent" : color;
  }
}
