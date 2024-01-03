import SVGBoard from "./svgboard/svgboard.js";
import DrawRectangleTool from "./svgboard/tools/draw-rectangle.js";
import DrawCircleTool from "./svgboard/tools/draw-circle.js";
import DrawLineTool from "./svgboard/tools/draw-line.js";
import MoveTool from "./svgboard/tools/move.js";
import SelectTool from "./svgboard/tools/select.js";
import DownloadTool from "./svgboard/tools/download.js";

const svgBoard = new SVGBoard("board", "toolbar", [
  SelectTool,
  MoveTool,
  [DrawRectangleTool, DrawCircleTool, DrawLineTool],
  DownloadTool,
]);
