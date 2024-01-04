import SVGBoard from "./svgboard/svgboard.js";
import DrawRectangleTool from "./svgboard/tools/draw-rectangle.js";
import DrawCircleTool from "./svgboard/tools/draw-circle.js";
import DrawLineTool from "./svgboard/tools/draw-line.js";
import PointerTool from "./svgboard/tools/pointer.js";
import DownloadTool from "./svgboard/tools/download.js";
import TrashTool from "./svgboard/tools/trash.js";
import PenTool from "./svgboard/tools/pen.js";

const svgBoard = new SVGBoard("board", "toolbar", [
  PointerTool,
  [DrawRectangleTool, DrawCircleTool, DrawLineTool, PenTool],
  DownloadTool,
  TrashTool,
]);
