const chatInteractions = () => {
  const isBlank = (str) => {
    return !str || str.trim().length === 0;
  };

  const sayWelcome = (color) => {
    return "Welcome <span style='color: " + color + "'>" + color + "</span>";
  };

  const sayMessage = (color, txt) => {
    if (isBlank(txt) || isBlank(color)) {
      return;
    }
    return "<span style='color: " + color + "'>" + color + "</span>: " + txt;
  };

  return {
    sayWelcome,
    sayMessage,
  };
};

module.exports = chatInteractions;
