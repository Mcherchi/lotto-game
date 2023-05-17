const { Ticket } = require("../Model/Ticket");
const { Extraction } = require("../Model/Extraction");

/**
 * The LottoTicketController class provides methods for generating lottery tickets.
 */
class LottoController {
  /**
   * Generates one or more lottery tickets based on the data passed as a parameter.
   * @param {Array} ticketData - Lottery ticket data.
   * @returns {Array} - Array of Ticket objects.
   */
  static generateTicket(ticketData) {
    const tickets = [];
    ticketData.forEach((element) => {
      tickets.push(new Ticket(...element));
    });
    return tickets;
  }

  static fakeExtraction(){
    return new Extraction();
  }

}

module.exports = { LottoController };
