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
      if(preset === "transparent") {
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

    const customColorPreview = document.createElement("div");
    customColorPreview.classList.add("preview");
    
    const customColorInput = document.createElement("input");
    customColorInput.value = this.color;
    
    customColorInput.addEventListener("change", () => {
      customColorPreview.style.backgroundColor = customColorInput.value;
      this.color = customColorInput.value;
      this.onColorChange(customColorInput.value);
    });
    customColorContainer.appendChild(customColorPreview);
    customColorContainer.appendChild(customColorInput);

    container.appendChild(presetsContainer);
    container.appendChild(customColorContainer);

    return container;
  }
}
