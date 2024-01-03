import SVGBoard from "./svgboard/editor.js";
import DrawRectangle from "./svgboard/commands/draw-rectangle.js";
import DrawCircle from "./svgboard/commands/draw-circle.js";

const svgBoard = new SVGBoard("board", "toolbar");
svgBoard.addCommand(new DrawRectangle(svgBoard));
svgBoard.addCommand(new DrawCircle(svgBoard));
