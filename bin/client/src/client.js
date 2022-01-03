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

(() => {
  const socket = io();
  socket.on("welcome", addMessageToChat);
  socket.on("message", addMessageToChat);

  document
    .querySelector("#chat-form")
    .addEventListener("submit", onChatSubmitted(socket));
})();
