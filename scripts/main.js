import SVGBoard from "./svgboard/editor.js";
import DrawRectangle from "./svgboard/tools/draw-rectangle.js";
import DrawCircle from "./svgboard/tools/draw-circle.js";
import DrawLine from "./svgboard/tools/draw-line.js";
import MoveTool from "./svgboard/tools/move.js";
import SelectTool from "./svgboard/tools/select.js";
import ColorPickerTool from "./svgboard/tools/color-picker.js";

const svgBoard = new SVGBoard("board", "toolbar", [
  SelectTool,
  MoveTool,
  [DrawRectangle, DrawCircle, DrawLine],
  ColorPickerTool,
]);
