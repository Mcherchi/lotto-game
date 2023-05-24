const { AsciiTable3, AlignmentEnum } = require("ascii-table3");
const { randomNumbers } = require("../Controller/utils");

/**
 * The Ticket class represents a lottery ticket.
 */
class Ticket {
  // Static counter to track the number of Ticket objects created.
  static idCounter = 0;

  // The cities property is an array of valid cities for the ticket.
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

  // The types property is an array of valid types for the ticket.
  static types = ["Estratto", "Ambo", "Terno", "Quaterna", "Cinquina"];

  // The typeMinNumbers property is an object that maps the ticket type to the minimum number of winning numbers.
  _typeMinNumbers = {
    Estratto: 1,
    Ambo: 2,
    Terno: 3,
    Quaterna: 4,
    Cinquina: 5,
  };

  /**
   * The constructor method creates a new Ticket object.
   * @param {number[]} numbers - The number of random numbers to generate for the ticket.
   * @param {string} type - The types of ticket.
   * @param {string[]} cities - The playable cities
   */
  constructor(numbers, type, cities) {
    // The id property is a unique identifier for the ticket.
    this._id = ++Ticket.idCounter;

    // The numbers property is an array of random numbers for the ticket.
    this._numbers = randomNumbers(numbers);

    // The type property is a valid type for the ticket.
    this._type = type;

    // The cities property is an array of valid cities for the ticket.
    this._cities = cities;

    // The winningDetails property is an array of objects that contains the winning details.
    this._winningDetails = [];
  }

  /**
   * This method prints the ticket information to the console using an ASCII table
   */
  printTicket() {
    // Create a new ASCII table with the ticket ID as the title
    const table = new AsciiTable3(`Ticket #${this._id}`)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ["Type", this._type], // Add "Type" row with ticket type
        ["City", this._cities.join(" - ")], // Add "City" row with valid cities joined by "-"
        ["Numbers", this._numbers.join(" - ")], // Add "Numbers" row with random numbers joined by "-"
      ]);
    // Print the table to the console
    console.log(`\n\n${table.toString()}\n`);
  }

  /**
   * This method checks if there is a winning combination based on the given extraction.
   * @param {object} extraction - The extraction data.
   * @returns {boolean} - True if there is a winning combination, otherwise false.
   */
  checkWinning(extraction) {
    // Determine the cityArray based on whether 'Tutte' is included in this._cities
    const cityArray = this._cities.includes("Tutte")
      ? extraction._cities
      : this._cities;

    // Iterate through each city in the cityArray
    for (const city of cityArray) {
      // Filter the winning numbers in the extraction for the current city based on the numbers array
      const winningNumbers = extraction._extraction[city].filter((number) =>
        this._numbers.includes(number)
      );

      // Get the minimum number required for a winning combination based on the current type
      const minWinningNumber = this._typeMinNumbers[this._type];

      // Check if there are enough winning numbers to meet the minimum requirement
      if (winningNumbers.length >= minWinningNumber) {
        // If there are enough winning numbers, add the city and winning numbers to the winningDetails array
        this._winningDetails.push({
          city,
          winningNumbers,
        });
      }
    }

    // Check if there are any winning details
    if (this._winningDetails.length > 0) {
      return true; // There is a winning combination, return true
    }

    return false; // No winning combination found, return false
  }

  /**
   * Prints the details of a winning ticket using an ASCII table.
   * @param {object} extraction - The extraction data.
   */
  printWinningTicketDetails(extraction) {
    // Check if the ticket is winning by calling the checkWinning() method
    const isWinning = this.checkWinning(extraction);

    // If the ticket is winning, create a new ASCII table with the title "Ticket# {id}: Winning"
    if (isWinning) {
      const table = new AsciiTable3(`Ticket#${this._id}: Winning`)

        // Set the alignment of the columns to center
        .setAlign(3, AlignmentEnum.CENTER)

        // Add a row to the table with the label "Type" and the value of the ticket type
        .addRowMatrix([["Type", this._type]]);

      // Iterate through each winning detail and add a row to the table with the city and winning numbers
      this._winningDetails.forEach((detail) => {
        table.addRow(detail.city, detail.winningNumbers.join(" - "));
      });

      // Print the table to the console
      console.log(`\n\n${table.toString()}\n`);
    }
    // If the ticket is not winning, print a message indicating it
    else {
      console.log(`Ticket #${this._id} Not winning`);
    }
  }
}

module.exports = { Ticket };
