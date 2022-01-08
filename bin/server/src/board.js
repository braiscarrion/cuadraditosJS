const { createCanvas } = require("canvas");

const canvasWidth = 400;
const canvasHeight = 400;
const dotRadius = 5;
const leftPadding = 20;
const topPadding = 20;
const squareWidth = 70;
const squareHeight = 70;

const createBoard = () => {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  const getBoard = () => {
    const dotColor = "rgba(0,0,0,0.5)";

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        drawCircle(
          ctx,
          leftPadding + x * squareWidth,
          topPadding + y * squareHeight,
          dotColor
        );
      }
    }
  };

  const getBoardJson = () => {
    var canvasContent = canvas.toDataURL();
    var data = { board: canvasContent };
    var boardJson = JSON.stringify(data);
    return boardJson;
  };

  const drawCircle = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawRectangle = (ctx, x, y, boardColor) => {
    ctx.fillStyle = boardColor;
    ctx.fillRect(x, y, 20, 20);
  };

  return {
    getBoard,
    getBoardJson,
  };
};

module.exports = createBoard;
