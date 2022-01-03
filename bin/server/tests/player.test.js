const createPlayer = require("../src/player.js");
const { getColor } = createPlayer();

describe("Player", () => {
  describe("getColor", () => {
    test("getColor returns a random color", () => {
      let color = getColor();
      expect(color).toMatch(new RegExp("#[0-9A-Fa-f]{6}"));
    });
  });
});
