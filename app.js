const print = require("./View/print");
const userInput = require("./Controller/userInputsController");
const { LottoTicketController } = require("./Controller/LottoTicketController");

// Define a function called `play` which will run the game
const play = () => {
  // Ask user for number of tickets they want to generate
  const numTickets = userInput.howManyTicket();
  // Ask user for the data to generate the tickets
  const ticketData = userInput.getTicketData(numTickets);
  // Generate tickets using the `LottoTicketController` and the provided `ticketData`
  const tickets = LottoTicketController.generateTicket(ticketData);
  // Print the generated tickets using the `printTicket` function from `print.js`
  print.printTicket(tickets);
};

play();
