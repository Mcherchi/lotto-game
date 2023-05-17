const { AsciiTable3, AlignmentEnum } = require("ascii-table3");


/**
 * Prints an ASCII table for each ticket object in the provided array.
 *
 * @param {Array} tickets - The array of ticket objects to print.
 */
const printTicket = (tickets) => {
  // Iterate through the array of ticket objects
  tickets.forEach((ticket) => {
    // Create a new ASCII table with the ticket ID as the title
    const table = new AsciiTable3(`Ticket #${ticket.id}`)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ["Type", ticket.type.join(" - ")],
        ["City", ticket.cities.join(" - ")],
        ["Numbers", ticket.numbers.join(" - ")],
      ]);
    // Print the table to the console
    console.log(`\n\n${table.toString()}\n`);
  });
};

const printExtraction = (extraction) =>{
  const table = new AsciiTable3(`Extraction #${extraction._id} - ${extraction._date}`)
    .setHeading("city", "Numbers")
    .setAlign(3, AlignmentEnum.CENTER);
    for(const city of extraction._cities){
      const cityNumbers = extraction._extraction[city].join(" - ");
      table.addRowMatrix([
        [city, cityNumbers]
      ]);
    }
    console.log(`\n\n${table.toString()}\n`);
}

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
  printExtraction(extraction);
  printTicket(ticket);
}

module.exports = {printAll, printMessage, printArray };
