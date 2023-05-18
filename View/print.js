
/**
 * Prints an ASCII table for each ticket object in the provided array.
 *
 * @param {Array} tickets - The array of ticket objects to print.
 */
const printTickets = (tickets) => {
  // Iterate through the array of ticket objects
  tickets.forEach((ticket) => {
    ticket.printTicket();
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

const printAll = (ticket, extraction) =>{
  console.clear();
  extraction.printExtraction();
  printTickets(ticket);
}

module.exports = {printAll, printMessage, printArray };
