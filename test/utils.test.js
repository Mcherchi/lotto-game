const print = require("../View/print");
const message = require("../View/messages");
let prompt = require("prompt-sync")();
const {
  randomNumbers,
  confirmChoice,
  sliceArrayByLength,
} = require("../Controller/utils");

describe("randomNumbers", () => {
  test("Should generate the specified quantity of random numbers", () => {
    const quantityOfNumbers = 5;
    const numbers = randomNumbers(quantityOfNumbers);
    expect(numbers.length).toBe(quantityOfNumbers);
  });

  test("Should generate unique random numbers", () => {
    const quantityOfNumbers = 10;
    const result = randomNumbers(quantityOfNumbers);
    const uniqueSet = new Set(result);
    expect(uniqueSet.size).toBe(quantityOfNumbers);
  });

  test("Should generate random numbers between 1 and 90", () => {
    const quantityOfNumbers = 10;
    const result = randomNumbers(quantityOfNumbers);
    expect(result.every((number) => number >= 1 && number <= 90)).toBe(true);
  });

  test("Should generate random numbers in ascending order", () => {
    const quantityOfNumbers = 10;
    const result = randomNumbers(quantityOfNumbers);
    expect(result.every((num, i, arr) => i === 0 || num > arr[i - 1])).toBe(
      true
    );
  });
});

describe("sliceArrayByLength", () => {
  test("Should return a new array with the specified length", () => {
    const input = 3;
    const array = [1, 2, 3, 4, 5];
    const result = sliceArrayByLength(input, array);
    expect(result).toHaveLength(input);
    expect(result).toEqual([1, 2, 3]);
  });

  test("Should return the original array if the input is not between 1 and 4", () => {
    const input = 5;
    const array = [1, 2, 3, 4, 5];
    const result = sliceArrayByLength(input, array);
    expect(result).toEqual(array);
  });
});

