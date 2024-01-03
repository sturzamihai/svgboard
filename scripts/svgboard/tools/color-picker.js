import Tool from "./tool.js";

export default class ColorPickerTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Color Picker", "images/pallete.svg");
    this.button = this.createButton();
  }

  createButton() {
    const container = document.createElement("div");
    container.classList.add("color-picker");
    const button = document.createElement("button");

    button.innerHTML = `<img src="${this.iconSrc}" alt="${this.title}" height="25" width="25"/> `;
    button.addEventListener("click", () => {
        button.classList.add("active");
    });

    this.presets = [
        "#000000",
        "#FFFFFF",
        "#FF0000",
    ]

    this.presets.forEach((color) => {
        const preset = document.createElement("button");
        preset.classList.add("preset");
        preset.style.backgroundColor = color;

        preset.addEventListener("click", () => {
            this.svgBoard.setActiveColor(color);
        });
        
        container.appendChild(preset);
    });

    container.appendChild(button);

    return container;
  }
}
