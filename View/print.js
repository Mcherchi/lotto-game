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
 * Prints the winning details of multiple tickets based on the given extraction.
 * @param {Ticket[]} tickets - An array of lottery tickets.
 * @param {Extraction} extraction - The extraction data.
 */
const printWinningDetails = (tickets, extraction) => {
  // Print the number of tickets played and a message indicating that details on winnings will be printed
  console.log(
    `You played ${tickets.length} tickets, details on winnings are below`
  );

  // Iterate through each ticket in the array
  tickets.forEach((ticket) => {
    // Call the printWinningTicketDetails() method of each ticket to print the winning details
    ticket.printWinningTicketDetails(extraction);
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

/**
 * Prints all the necessary information for the lottery ticket and extraction.
 * @param {Ticket} ticket - The lottery ticket.
 * @param {Extraction} extraction - The extraction data.
 */
const printAll = (ticket, extraction) => {
  // Clear the console before printing the information
  // console.clear();

  // Print the details of the lottery ticket using the printTickets() function
  printTickets(ticket);

  // Print the details of the extraction using the printExtraction() method of the Extraction object
  extraction.printExtraction();

  // Print the winning details of the ticket using the printWinningDetails() function
  printWinningDetails(ticket, extraction);
};

module.exports = { printAll, printMessage, printArray };
