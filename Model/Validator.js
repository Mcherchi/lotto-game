/**
 * The Validator class provides methods for validating user input.
 */
class Validator {
  /**
   * Check if the given input is valid, based on the list of valid inputs.
   * @param {Array} validInput - List of valid inputs.
   * @param {*} input - User input to check.
   * @returns {boolean} - True if the input is valid, false otherwise.
   */
  static checkInput = (validInput, input) => {
    return validInput.includes(input);
  };

  /**
   * Check if the given input is within the given range.
   * @param {number} input - User input to check.
   * @param {number} min - Minimum value of the range.
   * @param {number} max - Maximum value of the range.
   * @returns {boolean} - True if the input is within the range, false otherwise.
   */
  static checkInRange = (input, min, max) => {
    return input >= min && input <= max;
  };
}

module.exports = { Validator };
