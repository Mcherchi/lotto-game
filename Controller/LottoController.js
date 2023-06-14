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

  /**
   * Generates a fake extraction.
   * @returns {Extraction} - An instance of the Extraction class.
   */
  static fakeExtraction() {
    return new Extraction();
  }

  /**
   * Checks if tickets have won based on the provided extraction.
   * @param {Ticket[]} tickets - An array of Ticket objects.
   * @param {Extraction} extraction - An instance of the Extraction class.
   */
  static checkWinningTickets(tickets, extraction) {
    tickets.forEach((ticket) => {
      ticket.checkWinning(extraction);
    });
  }
}

module.exports = { LottoController };
