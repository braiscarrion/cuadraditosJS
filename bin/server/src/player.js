const randomColor = require("randomcolor");

const createPlayer = () => {
  let color = randomColor();
  const getColor = () => {
    return color;
  };

  return {
    getColor,
  };
};

module.exports = createPlayer;
