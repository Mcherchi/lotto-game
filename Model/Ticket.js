const { AsciiTable3, AlignmentEnum } = require("ascii-table3");

/**
 * The Ticket class represents a lottery ticket.
 */
class Ticket {
  // Static counter to track the number of Ticket objects created.
  static idCounter = 0;

  static cities = [
    "Bari",
    "Cagliari",
    "Firenze",
    "Genova",
    "Milano",
    "Napoli",
    "Palermo",
    "Roma",
    "Torino",
    "Venezia",
    "Tutte",
  ];

  static types = ["Estratto", "Ambo", "Terno", "Quaterna", "Cinquina"];

  // The typeMinNumbers property is an object that maps the ticket type to the minimum number of winning numbers.
  _typeMinNumbers = {
    Estratto: 1,
    Ambo: 2,
    Terno: 3,
    Quaterna: 4,
    Cinquina: 5,
  };

  // The typeMaxWinning property is an object that maps the ticket type to the maximum winning amount.
  _typeMaxWinning = {
    Estratto: 11.23,
    Ambo: 250,
    Terno: 4500,
    Quaterna: 120000,
    Cinquina: 6000000,
  };

  /**
   * The constructor method creates a new Ticket object.
   * @param {number[]} numbers - The number of random numbers to generate for the ticket.
   * @param {string} type - The types of ticket.
   * @param {string[]} cities - The playable cities
   * @param {number} bet -
   */
  constructor(numbers, type, cities, bet) {
    this._id = ++Ticket.idCounter;

    this._numbers = numbers;

    this._type = type;

    this._cities = cities;

    this._winningDetails = [];

    this._bet = bet;

    this._isWinning = false;

    this._grossWinning = 0;

    this._netWinning = 0;
  }

  /**
   * This method prints the ticket information to the console using an ASCII table
   */
  printTicket() {
    const table = new AsciiTable3(`Ticket #${this._id}`)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ["Type", this._type], // Add "Type" row with ticket type
        ["City", this._cities.join(" - ")], // Add "City" row with valid cities joined by "-"
        ["Numbers", this._numbers.join(" - ")], // Add "Numbers" row with random numbers joined by "-"
        ["Bet", `€${this._bet}`], // Add "Bet" row with bet amount
      ]);

    console.log(`\n\n${table.toString()}\n`);
  }

  /**
   * This method checks if there is a winning combination based on the given extraction.
   * @param {object} extraction - The extraction data.
   */
  checkWinning(extraction) {
    const cityArray = this._cities.includes("Tutte")
      ? extraction._cities
      : this._cities;

    // Get the minimum number required for a winning combination based on the current type
    const minWinningNumber = this._typeMinNumbers[this._type];

    for (const city of cityArray) {
      // Filter the winning numbers in the extraction for the current city based on the numbers array
      const winningNumbers = extraction._extraction[city].filter((number) =>
        this._numbers.includes(number)
      );

      // Check if there are enough winning numbers to meet the minimum requirement
      if (winningNumbers.length >= minWinningNumber) {
        this._winningDetails.push({
          city,
          winningNumbers,
        });
      }
    }

    // Check if there are any winning details in the winningDetails array
    if (this._winningDetails.length > 0) {
      this._isWinning = true;
      this._grossWinning = this.#calculateGrossWinning();
      this._netWinning = this.#calculateNetWinning();
    }
  }

  /**
   * Calculate the gross winning ammount.
   * @returns {number} - The gross winning amount rounded to two decimal places.
   */
  #calculateGrossWinning() {
    // Calculate the divisor as the length of the _cities array if 'Tutte' is not included, otherwise 10.
    const divisor = this._cities.includes("Tutte") ? 10 : this._cities.length;

    // Calculate the multiplier as the ratio of the maximum winning amount for the ticket type and the length of the _numbers array.
    const multiplier = this._typeMaxWinning[this._type] / this._numbers.length;

    return ((multiplier * this._bet) / divisor).toFixed(2);
  }

  /**
   * Calculates the net winning amount.
   * @returns {number} - The net winning amount rounded to two decimal places.
   */
  #calculateNetWinning() {
    const netWinning = this._grossWinning - this._grossWinning * 0.08;
    return netWinning.toFixed(2);
  }

  /**
   * Prints the details of a winning ticket using an ASCII table.
   * @param {object} extraction - The extraction data.
   */
  printWinningTicketDetails() {
    if (this._isWinning) {
      const table = new AsciiTable3(`Ticket #${this._id}: Winning`).setAlign(
        3,
        AlignmentEnum.CENTER
      );

      this._winningDetails.forEach((detail) => {
        table.addRow(detail.city, detail.winningNumbers.join(" - "));
      });

      table.addRowMatrix([
        ["Type", this._type],
        ["gross Winnind", `€ ${this._grossWinning}`],
        ["net Winnind", `€ ${this._netWinning}`],
      ]);

      console.log(`\n\n${table.toString()}\n`);
    } else {
      console.log(`Ticket #${this._id} Not winning`);
    }
  }
}

module.exports = { Ticket };
