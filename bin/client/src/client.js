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
    socket.on("message", addMessageToChat);

    document
    .querySelector("#chat-form")
    .addEventListener("submit", onChatSubmitted(socket));
})();