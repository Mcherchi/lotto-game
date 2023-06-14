const { Ticket } = require("../Model/Ticket");

describe("Ticket", () => {
  describe("Constructor", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
      _bet: 5,
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));
    });

    test("Should create a new Ticket object with default values", () => {
      expect(ticket).toBeInstanceOf(Ticket);
      expect(ticket._id).toBe(1);
      expect(ticket._winningDetails).toEqual([]);
      expect(ticket._isWinning).toBe(false);
      expect(ticket._grossWinning).toBe(0);
      expect(ticket._netWinning).toBe(0);
    });

    test("Should set the ticket features correctly", () => {
      expect(ticket._numbers).toEqual(ticketFeatures._numbers);
      expect(ticket._type).toBe(ticketFeatures._type);
      expect(ticket._cities).toEqual(ticketFeatures._cities);
      expect(ticket._bet).toBe(ticketFeatures._bet);
    });
  });

  describe("printTicket", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
      _bet: 5,
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));
    });

    test("Should print the ticket information", () => {
      ticket._id = 1;
      const consoleLogSpy = jest.spyOn(console, "log");
      ticket.printTicket();

      expect(consoleLogSpy).toBeCalledWith(
        expect.stringContaining("Ticket #1")
      );

      expect(consoleLogSpy).toBeCalledWith(expect.stringContaining("Type"));
      expect(consoleLogSpy).toBeCalledWith(expect.stringContaining("Ambo"));

      expect(consoleLogSpy).toBeCalledWith(expect.stringContaining("City"));
      expect(consoleLogSpy).toBeCalledWith(
        expect.stringContaining("Bari - Roma")
      );

      expect(consoleLogSpy).toBeCalledWith(expect.stringContaining("Numbers"));
      expect(consoleLogSpy).toBeCalledWith(
        expect.stringContaining("1 - 2 - 3")
      );

      consoleLogSpy.mockRestore();
    });
  });

  describe("checkWinning", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));

      ticket._calculateGrossWinning = jest.fn().mockReturnValue(10.0);
      ticket._calculateNetWinning = jest.fn().mockReturnValue(9.2);
    });
    test("Should update the winning details and calculate gross/net winnings correctly", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [1, 2, 3, 4, 5],
          Roma: [2, 3, 4, 5, 6],
        },
      };

      ticket.checkWinning(extraction);

      expect(ticket._calculateGrossWinning).toBeCalled();
      expect(ticket._calculateNetWinning).toBeCalled();
      expect(ticket._winningDetails).toEqual([
        { city: "Bari", winningNumbers: [1, 2, 3] },
        { city: "Roma", winningNumbers: [2, 3] },
      ]);
      expect(ticket._isWinning).toBe(true);
      expect(ticket._grossWinning).toBe(10.0);
      expect(ticket._netWinning).toBe(9.2);
    });

    test("Should not update the winning details if there are no winning numbers", () => {
      const extraction = {
        _cities: ["Bari", "Roma"],
        _extraction: {
          Bari: [6, 7, 8],
          Roma: [9, 10, 11],
        },
      };

      ticket.checkWinning(extraction);

      expect(ticket._calculateGrossWinning).not.toBeCalled();
      expect(ticket._calculateNetWinning).not.toBeCalled();
      expect(ticket._winningDetails).toEqual([]);
      expect(ticket._isWinning).toBe(false);
      expect(ticket._grossWinning).toBe(0);
      expect(ticket._netWinning).toBe(0);
    });
  });

  describe("printWinningTicketDetails", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));
    });

    test("should print the winning ticket details", () => {
      ticket._id = 1;
      ticket._isWinning = true;
      ticket._grossWinning = 10.0;
      ticket._netWinning = 9.2;
      ticket._winningDetails = [
        { city: "Bari", winningNumbers: [1, 2, 3] },
        { city: "Roma", winningNumbers: [2, 3] },
      ];

      console.log = jest.fn();

      ticket.printWinningTicketDetails();

      expect(console.log).toBeCalledWith(
        expect.stringContaining("Ticket #1: Winning")
      );
      expect(console.log).toBeCalledWith(expect.stringContaining("Bari"));
      expect(console.log).toBeCalledWith(expect.stringContaining("1 - 2 - 3"));
      expect(console.log).toBeCalledWith(expect.stringContaining("Roma"));
      expect(console.log).toBeCalledWith(expect.stringContaining("2 - 3"));
      expect(console.log).toBeCalledWith(expect.stringContaining("Type"));
      expect(console.log).toBeCalledWith(expect.stringContaining("Ambo"));
      expect(console.log).toBeCalledWith(
        expect.stringContaining("gross Winning")
      );
      expect(console.log).toBeCalledWith(expect.stringContaining("€ 10"));
      expect(console.log).toBeCalledWith(
        expect.stringContaining("net Winning")
      );
      expect(console.log).toBeCalledWith(expect.stringContaining("€ 9.2"));
    });

    test("Should print 'Not winning' for a non-winning ticket", () => {
      ticket._id = 1;
      ticket._isWinning = false;

      console.log = jest.fn();

      ticket.printWinningTicketDetails();

      expect(console.log).toBeCalledWith("Ticket #1 Not winning");
    });
  });

  describe("calculateGrossWinning", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
      _bet: 5,
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));
    });
    test("Should calculate the gross winning amount correctly when 'Tutte' is not included in cities", () => {
      ticket._typeMaxWinning = { Ambo: 250 };
      const grossWinning = ticket._calculateGrossWinning();
      expect(grossWinning).toBe("208.33");
    });
    test("Should calculate the gross winning amount correctly when 'Tutte' is included in cities", () => {
      ticket._cities = ["Tutte"];
      ticket._typeMaxWinning = { Ambo: 250 };
      const grossWinning = ticket._calculateGrossWinning();
      expect(grossWinning).toBe("41.67");
    });
  });

  describe("calculateNetWinning", () => {
    const ticketFeatures = {
      _numbers: [1, 2, 3],
      _type: "Ambo",
      _cities: ["Bari", "Roma"],
      _bet: 5,
    };
    let ticket;
    beforeEach(() => {
      ticket = new Ticket(...Object.values(ticketFeatures));
    });
    test("Should calculate the net winning amount correctly", () => {
      ticket._grossWinning = 10.0;
      const netWinning = ticket._calculateNetWinning();
      expect(netWinning).toBe("9.20");
    });
  });
});
