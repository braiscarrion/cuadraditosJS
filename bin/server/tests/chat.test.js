const chatInteractions = require("../src/chat.js");
const { sayWelcome, sayMessage } = chatInteractions();

describe("Chat", () => {
  let color = "#012345";

  describe("sayWelcome", () => {
    test("sayWelcome returns a welcome message with given color", () => {
      let expected =
        "Welcome <span style='color: " + color + "'>" + color + "</span>";
      expect(sayWelcome(color)).toBe(expected);
    });
  });

  describe("sayMessage", () => {
    let message = "testing";

    test("sayMessage returns a text [color: message] with given color and message", () => {
      let expected =
        "<span style='color: " + color + "'>" + color + "</span>: " + message;
      expect(sayMessage(color, message)).toBe(expected);
    });

    test("sayMessage returns undefined when an empty message is given", () => {
      expect(sayMessage(color, "")).toBe(undefined);
    });

    test("sayMessage returns undefined when a null message is given", () => {
      expect(sayMessage(color, null)).toBe(undefined);
    });

    test("sayMessage returns undefined when a null color is given", () => {
      let expected =
        "<span style='color: " + color + "'>" + color + "</span>: " + message;
      expect(sayMessage(null, message)).toBe(undefined);
    });
  });
});
