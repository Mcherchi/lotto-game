const print = require("../View/print");
const message = require("../View/messages");
const prompt = require("prompt-sync")();

/**
 * generates a specified quantity of random numbers between 1 and 90.
 * @param {number} quantityOfNumbers - The quantity of numbers to generate.
 * @returns {Array} - An array of unique random numbers sorted in ascending order.
 */
const randomNumbers = (quantityOfNumbers) => {
  const numbers = new Set();
  while (numbers.size < quantityOfNumbers) {
    numbers.add(Math.floor(Math.random() * 90) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * prompts the user to confirm their choice and returns a boolean value.
 * @param {string} choice - The choice to confirm.
 * @returns {boolean} - True if the user confirms their choice, false otherwise.
 */
const confirmChoice = (choice) => {
  console.clear();
  while (true) {
    print.printMessage(`\n${message.youHaveChosen}\n\n${choice}\n`);
    const confirmation = prompt(`${message.confirm}`).toUpperCase();
    if (confirmation === "Y") {
      return true;
    } else if (confirmation === "N") {
      return false;
    } else {
      console.clear()
      print.printMessage(`\n\n${message.warningConfirmCoiche}`);
    }
  }
};

/**
 * returns a new array with the specified length by slicing the input array.
 * If the input is not between 1 and 4, return the original array.
 * @param {number} input - The number of elements to slice from the array.
 * @param {Array} array - Array to slice.
 * @returns {Array} - A new array with the specified length, or the original array if the input is not between 1 and 4..
 */
const sliceArrayByLength = (input, array) => {
  return input >= 1 && input <= 4 ? array.slice(0, input) : array;
};

module.exports = { randomNumbers, confirmChoice, sliceArrayByLength };
