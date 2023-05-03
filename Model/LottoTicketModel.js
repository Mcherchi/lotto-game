const utils = require("../Controller/utils");

/**
 * The Ticket class represents a lottery ticket.
 */
class Ticket {
  // The idCounter property keeps track of the number of Ticket objects created.
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
   * @param {string[]} type - The types of ticket.
   * @param {string[]} cities - The playable cities
   */
  constructor(numbers, type, cities) {
    // The id property is a unique identifier for the ticket.
    this.id = ++Ticket.idCounter;

    // The numbers property is an array of random numbers for the ticket.
    this.numbers = utils.randomNumbers(numbers);

    // The type property is an array of valid types for the ticket.
    this.type = type;

    // The cities property is an array of valid cities for the ticket.
    this.cities = cities;
  }
}

module.exports = { Ticket };
