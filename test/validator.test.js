const { Validator } = require("../Model/Validator");

describe("Validator", () => {
  describe("checkInput", () => {
    test("Should return true if the input is in the valid input list", () => {
      const validInput = ["a", "b", "c"];
      const input = "a";
      const result = Validator.checkInput(validInput, input);
      expect(result).toBe(true);
    });

    test("Should return false if the input is not in the valid input list", () => {
      const validInput = ["a", "b", "c"];
      const input = "d";
      const result = Validator.checkInput(validInput, input);
      expect(result).toBe(false);
    });
  });

  describe("checkInRange", () => {
    test("Should return true if the input is within the range", () => {
      const input = 5;
      const min = 1;
      const max = 10;
      const result = Validator.checkInRange(input, min, max);
      expect(result).toBe(true);
    });

    test("Should return false if the input is not within the range", () => {
      const input = 15;
      const min = 1;
      const max = 10;
      const result = Validator.checkInRange(input, min, max);
      expect(result).toBe(false);
    });

    test("Should return true if the input is equal to the minimum value", () => {
      const input = 1;
      const min = 1;
      const max = 10;
      const result = Validator.checkInRange(input, min, max);
      expect(result).toBe(true);
    });

    test("Should return true if the input is equal to the maximum value", () => {
      const input = 10;
      const min = 1;
      const max = 10;
      const result = Validator.checkInRange(input, min, max);
      expect(result).toBe(true);
    });
  });
});
