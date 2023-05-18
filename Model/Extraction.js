const { AsciiTable3 } = require("ascii-table3");
const {randomNumbers} = require("../Controller/utils");

/**
 * Extraction class rapresent an extraction of numbers for varios cities.
 */
class Extraction {
  //  Static counter to track the number of Extraction objects created
  static idCounter = 0;

  // Number of numbers per city
  #numbers = 5;

  // Date of the extraction
  _date;

  // array of valid cities for the Extraction.
  _cities = [
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
  ];

  /**
   * The constructor method creates a new Extraction object.
   */
  constructor() {
    // Assigns a unique ID to the Extraction object.
    this._id = ++Extraction.idCounter;
    // Gets the current date formatted as a string.
    this._date = new Date().toLocaleDateString("it-IT");
    // Generates the extraction numbers for each city.
    this._extraction = this.#generateExtraction();
  }

  /**
   * Generates the number extraction for each city.
   * @returns {Object} - The extraction numbers for each city.
   */
  #generateExtraction() {
    // Object to store the numbers for each city
    const numbersPerCity = {};
    for (const city of this._cities) {
      // Generate random numbers for the city
      numbersPerCity[city] = randomNumbers(this.#numbers);
    }
    return numbersPerCity;
  }

  /**
   * Prints the extraction table for all cities.
   */
  printExtraction() {
    // Creates a new ASCII table for the extraction.
    const table = new AsciiTable3(`Extraction #${this._id} - ${this._date}`);

    // Sets the table headers.
    table.setHeading("City", "Numbers");

    for (const city of this._cities) {
      // Joins the numbers for the city into a string.
      const cityNumbers = this._extraction[city].join(" - ");

      table.addRow(city, cityNumbers);
    }
    // Print the table to the console
    console.log(`\n\n${table.toString()}\n`);
  }
}

module.exports = {Extraction};