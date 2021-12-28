const createPlayer = () => {
  let name = "player_test";

  const getName = () => {
    return name;
  };

  return {
    getName,
  };
};

module.exports = createPlayer;
