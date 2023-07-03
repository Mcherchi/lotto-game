/**
 * Prints an ASCII table for each ticket object in the provided array.
 *
 * @param {Array} tickets - The array of ticket objects to print.
 */
const printTickets = (tickets) => {
  tickets.forEach((ticket) => {
    ticket.printTicket();
  });
};

/**
 * Prints the winning details of multiple tickets.
 * @param {Ticket[]} tickets - An array of lottery tickets.
 */
const printWinningDetails = (tickets) => {
  // Print the number of tickets played and a message indicating that details on winnings will be printed
  console.log(
    `You played ${tickets.length} tickets, details on winnings are below`
  );

  tickets.forEach((ticket) => {
    ticket.printWinningTicketDetails();
  });
};

/**
 * Prints the provided message to the console.
 *
 * @param {string} message - The message to print.
 */
const printMessage = (message) => {
  console.log(message);
};

/**
 * Prints each element of the provided array to the console, preceded by its index.
 *
 * @param {Array} array - The array of elements to print.
 */
const printArray = (array) => {
  array.forEach((element, index) => {
    // Print the index and element to the console
    console.log(`${index + 1}) ${element}`);
  });
};

/**
 * Prints all the necessary information for the lottery ticket and extraction.
 * @param {Ticket} ticket - The lottery ticket.
 * @param {Extraction} extraction - The extraction data.
 */
const printAll = (ticket, extraction) => {
  console.clear();

  printTickets(ticket);

  extraction.printExtraction();

  printWinningDetails(ticket);
};

module.exports = {
  printTickets,
  printWinningDetails,
  printMessage,
  printArray,
  printAll,
};
