const createPlayer = require("../src/player.js");
const { getName } = createPlayer();

describe("Player", () => {
  test("getName returns a name", () => {
    expect(getName()).toBe("player_test");
  });
});
