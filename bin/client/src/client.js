function isBlank(str) {
  return !str || str.trim().length === 0;
}
const writeMessage = (playerName, message) => {
  if (isBlank(message)) {
    return;
  }
  const text = playerName + ": " + message;
  addMessageToChat(text);
};

const welcomePlayer = (playerName) => {
  const text = "Welcome to CuadraditosJS, " + playerName;
  addMessageToChat(text);
};

const addMessageToChat = (text) => {
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
  socket.on("welcome", welcomePlayer);
  socket.on("message", writeMessage);

  document
    .querySelector("#chat-form")
    .addEventListener("submit", onChatSubmitted(socket));
})();
