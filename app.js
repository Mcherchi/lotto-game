const print = require("./View/print");
const userInput = require("./Controller/userInputsController");
const { LottoController } = require("./Controller/LottoController");

// Define a function called `play` which will run the game
const play = () => {
  // Ask user for number of tickets they want to generate
  const numTickets = userInput.howManyTicket();
  // Ask user for the data to generate the tickets
  const ticketData = userInput.getTicketData(numTickets);
  // Generate tickets using the `LottoController` and the provided `ticketData`
  const tickets = LottoController.generateTicket(ticketData);
  // Generate an extraction using the `LottoController`
  const extraction = LottoController.fakeExtraction();
  // Check if the tickets have won using the `LottoController`
  LottoController.checkWinningTickets(tickets, extraction);

  // Print the tickets and the extraction using the `print` module
  print.printAll(tickets, extraction);
};

play();
