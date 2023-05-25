const { Ticket } = require("../Model/Ticket");

describe("Ticket", () => {
  describe("Constructor", () => {
    let ticket;
    beforeEach(() => {
      ticket = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"]);
    });

    test("Should create a new Ticket object", () => {
      expect(ticket).toBeInstanceOf(Ticket);
      expect(ticket._id).toBe(1);
      expect(ticket._numbers).toEqual([1, 2, 3]);
      expect(ticket._type).toBe("Ambo");
      expect(ticket._cities).toEqual(["Bari", "Roma"]);
      expect(ticket._winningDetails).toEqual([]);
    });
  });

  describe("printTicket", () => {
    let ticket;
    beforeEach(() => {
      ticket = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"]);
    });

    test("hould print the ticket information", () => {
      console.log = jest.fn();
      ticket.printTicket();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Ticket #2")
      );

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Type"));

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Ambo"));

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("City"));

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Bari - Roma")
      );

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Numbers")
      );

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("1 - 2 - 3")
      );
    });
  });

  describe("checkWinning", () => {
    let ticket;
    beforeEach(() => {
      ticket = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"]);
    });

    test("Should return true if the ticket is a winner", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [1, 2, 3, 4, 5],
          Roma: [2, 3, 4, 5, 6],
        },
      };
      expect(ticket.checkWinning(extraction)).toBe(true);
      expect(ticket._winningDetails).toEqual([
        { city: "Bari", winningNumbers: [1, 2, 3] },
        { city: "Roma", winningNumbers: [2, 3] },
      ]);
    });

    test("Should return false if the ticket is not a winner", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [6, 7, 8],
          Roma: [9, 10, 11],
        },
      };
      expect(ticket.checkWinning(extraction)).toBe(false);
      expect(ticket._winningDetails).toEqual([]);
    });
  });

  describe("printWinningTicketDetails", () => {
    let ticket;
    beforeEach(() => {
      ticket = new Ticket([1, 2, 3], "Ambo", ["Bari", "Roma"]);
    });

    test("should print the winning ticket details", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [1, 2, 3, 4, 5],
          Roma: [2, 3, 4, 5, 6],
        },
      };
      console.log = jest.fn();
      ticket.printWinningTicketDetails(extraction);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Ticket #5: Winning")
      );

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Type"));

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Ambo"));

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Bari"));

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("1 - 2 - 3")
      );

      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Roma"));

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("2 - 3")
      );
    });

    test("should print a message for a non-winning ticket", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [6, 7, 8],
          Roma: [9, 10, 11],
        },
      }
      console.log = jest.fn();
      ticket.printWinningTicketDetails(extraction);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Ticket #6 Not winning")
      );
    });
  });
});
