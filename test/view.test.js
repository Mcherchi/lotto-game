const {
  printTickets,
  printWinningDetails,
  printMessage,
  printArray,
} = require("../View/print");
const { Ticket } = require("../Model/Ticket");

describe("print", () => {
  describe("printTickets", () => {
    test("should call printTicket for each ticket object in the array", () => {
      const ticket1 = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"], 5);
      const ticket2 = new Ticket(
        [4, 5, 6],
        "Estratto",
        ["Milano", "Cagliari"],
        10
      );
      const tickets = [ticket1, ticket2];

      // Mock printTicket method for both tickets
      const printTicketMock = jest
        .spyOn(ticket1, "printTicket")
        .mockImplementation();
      jest.spyOn(ticket2, "printTicket").mockImplementation();

      printTickets(tickets);

      // Verify that printTicket is called for each ticket object
      expect(printTicketMock).toHaveBeenCalledTimes(1);
      expect(ticket2.printTicket).toHaveBeenCalledTimes(1);

      // Restore the original printTicket methods
      printTicketMock.mockRestore();
      ticket2.printTicket.mockRestore();
    });
  });

  describe("printWinningDetails", () => {
    test("should print the number of tickets played and winning details for each ticket", () => {
      const ticket1 = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"], 5);
      const ticket2 = new Ticket(
        [4, 5, 6],
        "Estratto",
        ["Milano", "Cagliari"],
        10
      );
      const tickets = [ticket1, ticket2];

      const consoleLogSpy = jest.spyOn(console, "log");
      const printWinningTicketDetailsSpy = jest.spyOn(
        ticket1,
        "printWinningTicketDetails"
      );

      printWinningDetails(tickets);

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `You played ${tickets.length} tickets, details on winnings are below`
      );

      expect(printWinningTicketDetailsSpy).toHaveBeenCalledTimes(1);

      consoleLogSpy.mockRestore();
      printWinningTicketDetailsSpy.mockRestore();
    });
  });

  describe("printMessage", () => {
    test("should print the provided message to the console", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      const message = "This is a test message";

      printMessage(message);

      expect(consoleLogSpy).toHaveBeenCalledWith(message);

      consoleLogSpy.mockRestore();
    });
  });

  describe("printArray", () => {
    test("should print each element of the array preceded by its index", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      const array = ["Estratto", "Ambo", "Terno", "Quaterna", "Cinquina"];

      printArray(array);

      expect(consoleLogSpy).toHaveBeenCalledTimes(array.length);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "1) Estratto");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "2) Ambo");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "3) Terno");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(4, "4) Quaterna");
      expect(consoleLogSpy).toHaveBeenNthCalledWith(5, "5) Cinquina");

      consoleLogSpy.mockRestore();
    });
  });
});
