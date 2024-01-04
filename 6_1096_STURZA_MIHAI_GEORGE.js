import SVGBoard from "./scripts/svgboard/svgboard.js";
import DrawRectangleTool from "./scripts/svgboard/tools/draw-rectangle.js";
import DrawCircleTool from "./scripts/svgboard/tools/draw-circle.js";
import DrawLineTool from "./scripts/svgboard/tools/draw-line.js";
import PointerTool from "./scripts/svgboard/tools/pointer.js";
import DownloadTool from "./scripts/svgboard/tools/download.js";
import TrashTool from "./scripts/svgboard/tools/trash.js";
import PenTool from "./scripts/svgboard/tools/pen.js";

const svgBoard = new SVGBoard("board", "toolbar", [
  PointerTool,
  [DrawRectangleTool, DrawCircleTool, DrawLineTool, PenTool],
  DownloadTool,
  TrashTool,
]);
