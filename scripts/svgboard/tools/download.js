import Tool from "./tool.js";

export default class DownloadTool extends Tool {
    constructor(svgBoard) {
        super(svgBoard, "Download", "images/download.svg");
    }
}