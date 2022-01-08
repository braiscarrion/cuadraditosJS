function isBlank(str) {
  return !str || str.trim().length === 0;
}

const addMessageToChat = (text) => {
  if (isBlank(text)) {
    return;
  }
  const parent = document.querySelector("#events");
  const el = document.createElement("li");
  el.innerHTML = text;
  parent.appendChild(el);
  parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (socket) => (e) => {
  e.preventDefault();

  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  socket.emit("message", text);
};

const getClickCoordinates = (element, ev) => {
  const { top, left } = element.getBoundingClientRect();
  const { clientX, clientY } = ev;

  return {
    x: clientX - left,
    y: clientY - top,
  };
};

const getBoard = (canvas) => {
  const ctx = canvas.getContext("2d");

  const fillRect = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x - 10, y - 10, 20, 20);
  };

  const renderCanvasJson = (json) => {
    var data = JSON.parse(json);
    var image = new Image();
    image.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    };
    image.src = data.board;
  };

  return {
    fillRect,
    renderCanvasJson,
  };
};

(() => {
  const canvas = document.querySelector("canvas");
  const { fillRect, renderCanvasJson } = getBoard(canvas);

  const socket = io();

  const onClick = (e) => {
    const { x, y } = getClickCoordinates(canvas, e);
    socket.emit("turn", { x, y });
  };

  socket.on("welcome", addMessageToChat);
  socket.on("message", addMessageToChat);
  socket.on("renderCanvas", renderCanvasJson);
  socket.on("turn", ({ x, y, color }) => fillRect(x, y, color));

  document
    .querySelector("#chat-form")
    .addEventListener("submit", onChatSubmitted(socket));

  canvas.addEventListener("click", onClick);
})();
