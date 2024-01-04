import Tool from "./tool.js";

export default class DownloadTool extends Tool {
  constructor(svgBoard) {
    super(svgBoard, "Download", "media/download.svg");
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

  downloadPNG() {
    const data = new XMLSerializer().serializeToString(this.svgBoard.container);
    const blob = new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);

    const image = new Image();
    image.width = this.svgBoard.container.width.baseVal.value;
    image.height = this.svgBoard.container.height.baseVal.value;
    image.src = url;
    image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(url);

        const downloadLink = document.createElement("a");
        downloadLink.download = "image.png";
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.click();
    })
  }

  downloadSVG() {
    const data = new XMLSerializer().serializeToString(this.svgBoard.container);
    const a = document.createElement("a");
    a.download = "image.svg";
    a.href = "data:image/svg+xml;base64," + btoa(data);
    a.click();
  }
}
