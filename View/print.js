/**
 * Prints an ASCII table for each ticket object in the provided array.
 *
 * @param {Array} tickets - The array of ticket objects to print.
 */
const printTicket = (tickets) => {
  // Clear the console before printing the tables
  console.clear();

  // Import the ascii-table module
  const asciiTable = require("ascii-table");

  // Iterate through the array of ticket objects
  tickets.forEach((ticket) => {
    // Create a new ASCII table with the ticket ID as the title
    const table = new asciiTable(`Ticket #${ticket.id}`);

    // Set the column headings for the table
    table.setHeading("Type", "City", "Numbers");

    // Add a new row to the table for this ticket
    table.addRow(
      ticket.type.join(" - "),
      ticket.cities.join(" - "),
      ticket.numbers.join(" - ")
    );

    // Print the table to the console
    console.log(`\n\n${table.toString()}\n`);
  });
};

/**
 * Prints the provided message to the console.
 *
 * @param {string} message - The message to print.
 */
const printMessage = (message) => {
  // Print the message to the console
  console.log(message);
};

/**
 * Prints each element of the provided array to the console, preceded by its index.
 *
 * @param {Array} array - The array of elements to print.
 */
const printArray = (array) => {
  // Iterate through each element of the array
  array.forEach((element, index) => {
    // Print the index and element to the console
    console.log(`${index + 1}) ${element}`);
  });
};

module.exports = { printTicket, printMessage, printArray };
