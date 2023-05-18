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

  /**
   * The constructor method creates a new Ticket object.
   * @param {number[]} numbers - The number of random numbers to generate for the ticket.
   * @param {string} type - The types of ticket.
   * @param {string[]} cities - The playable cities
   */
  constructor(numbers, type, cities) {
    // The id property is a unique identifier for the ticket.
    this.id = ++Ticket.idCounter;

    // The numbers property is an array of random numbers for the ticket.
    this.numbers = randomNumbers(numbers);

    // The type property is a valid type for the ticket.
    this.type = type;

    // The cities property is an array of valid cities for the ticket.
    this.cities = cities;
  }

  /**
   * This method prints the ticket information to the console using an ASCII table
   */
  printTicket() {
    // Create a new ASCII table with the ticket ID as the title
    const table = new AsciiTable3(`Ticket #${this.id}`)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ["Type", this.type], // Add "Type" row with ticket type
        ["City", this.cities.join(" - ")], // Add "City" row with valid cities joined by "-"
        ["Numbers", this.numbers.join(" - ")], // Add "Numbers" row with random numbers joined by "-"
      ]);
    // Print the table to the console
    console.log(`\n\n${table.toString()}\n`);
  }
}

module.exports = { Ticket };
