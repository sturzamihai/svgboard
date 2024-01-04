import Tool from "./tool.js";

export default class DownloadTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Download", "media/download.svg");

    window.downloadPNG = () => this.downloadPNG();
  }

  createButton() {
    const container = document.createElement("div");
    container.id = "download";

    const iconButton = document.createElement("button");
    iconButton.classList.add("icon-button");
    iconButton.innerHTML = `<img src="${this.iconSrc}" alt="${this.title}" height="25" width="25"/> `;

    const optionIsland = document.createElement("div");
    optionIsland.classList.add("option-island");

    const pngButton = document.createElement("button");
    pngButton.innerHTML = `<img src="media/image.svg" alt="PNG" height="25" width="25"/> `;
    pngButton.addEventListener("click", () => this.downloadPNG());

    const svgButton = document.createElement("button");
    svgButton.innerHTML = `<img src="media/path.svg" alt="SVG" height="25" width="25"/> `;
    svgButton.addEventListener("click", () => this.downloadSVG());

    optionIsland.appendChild(pngButton);
    optionIsland.appendChild(svgButton);

    container.appendChild(iconButton);
    container.appendChild(optionIsland);

    document.body.appendChild(container);
  }

  getInlineStyles(element) {
    const computedStyle = getComputedStyle(element);
    let inlineStyle = "";

    for (let i = 0; i < computedStyle.length; i++) {
      const property = computedStyle[i];
      inlineStyle += `${property}:${computedStyle.getPropertyValue(property)};`;
    }

    return inlineStyle;
  }

  downloadPNG() {
    const targetWidth =
      this.svgBoard.container.viewBox.baseVal.width ||
      this.svgBoard.container.clientWidth;
    const targetHeight =
      this.svgBoard.container.viewBox.baseVal.height ||
      this.svgBoard.container.clientHeight;

    document.body.setAttribute("style", this.getInlineStyles(document.body));
    this.svgBoard.container.setAttribute(
      "style",
      this.getInlineStyles(this.svgBoard.container)
    );

    const data = new XMLSerializer().serializeToString(this.svgBoard.container);
    const blob = new Blob([data], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const image = new Image(targetWidth, targetHeight);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);

      const dataURL = canvas.toDataURL();
      this.downloadResource("image.png", dataURL);
    };

    image.src = url;

    document.body.removeAttribute("style");
    this.svgBoard.container.removeAttribute("style");
  }

  downloadSVG() {
    const data = new XMLSerializer().serializeToString(this.svgBoard.container);
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    this.downloadResource("image.svg", url);
  }

  downloadResource(filename, href) {
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = href;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
