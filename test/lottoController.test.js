const { LottoController } = require("../Controller/LottoController");
const { Ticket } = require("../Model/Ticket");
const { Extraction } = require("../Model/Extraction");

describe("LottoController", () => {
    describe('generateTicket', () => {
        test("Should generate an array of Ticket objects", () => {
            const ticketData = [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
            ];
            const result = LottoController.generateTicket(ticketData);
            expect(result).toHaveLength(ticketData.length);
            expect(result.every((ticket) => ticket instanceof Ticket)).toBe(true);
        })
    });
});
