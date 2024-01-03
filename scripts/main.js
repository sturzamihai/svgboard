import SVGBoard from "./svgboard/editor.js";
import DrawRectangle from "./svgboard/tools/draw-rectangle.js";
import DrawCircle from "./svgboard/tools/draw-circle.js";
import DrawLine from "./svgboard/tools/draw-line.js";
import MoveTool from "./svgboard/tools/move.js";
import SelectTool from "./svgboard/tools/select.js";

const svgBoard = new SVGBoard("board", "toolbar");
svgBoard.addTool(new SelectTool(svgBoard));
svgBoard.addTool(new MoveTool(svgBoard));
svgBoard.addTool(new DrawRectangle(svgBoard));
svgBoard.addTool(new DrawCircle(svgBoard));
svgBoard.addTool(new DrawLine(svgBoard));
