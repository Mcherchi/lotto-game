const { LottoController } = require("../Controller/LottoController");
const { Ticket } = require("../Model/Ticket");
const { Extraction } = require("../Model/Extraction");

describe("LottoController", () => {
  describe("generateTickets", () => {
    test("Should generate an array of Ticket objects based on the ticketData", () => {
      const ticketData = [
        [[1, 2, 3], "Ambo", ["Bari", "Roma"], 5],
        [[4, 5, 6], "Terno", ["Milano"], 10],
      ];

      const tickets = LottoController.generateTickets(ticketData);

      expect(tickets).toHaveLength(2);
      expect(tickets[0]).toBeInstanceOf(Ticket);
      expect(tickets[0]._numbers).toEqual([1, 2, 3]);
      expect(tickets[0]._type).toBe("Ambo");
      expect(tickets[0]._cities).toEqual(["Bari", "Roma"]);
      expect(tickets[0]._bet).toBe(5);
      expect(tickets[1]).toBeInstanceOf(Ticket);
      expect(tickets[1]._numbers).toEqual([4, 5, 6]);
      expect(tickets[1]._type).toBe("Terno");
      expect(tickets[1]._cities).toEqual(["Milano"]);
      expect(tickets[1]._bet).toBe(10);
    });
  });

  describe("fakeExtraction", () => {
    test("Should return an Extraction object", () => {
      const extraction = LottoController.fakeExtraction();

      expect(extraction).toBeInstanceOf(Extraction);
    });
  });

  describe("checkWinningTickets", () => {
    test("Should check if tickets have won based on the provided extraction", () => {
      const tickets = [
        new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"], 5),
        new Ticket([4, 5, 6], "Terno", ["Milano"], 10),
      ];
      const extraction = new Extraction();

      LottoController.checkWinningTickets(tickets, extraction);

      expect(tickets[0]._isWinning).toBe(false);
      expect(tickets[1]._isWinning).toBe(false);
    });
  });
});
