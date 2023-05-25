const { LottoController } = require("../Controller/LottoController");
const { Ticket } = require("../Model/Ticket");
const { Extraction } = require("../Model/Extraction");

describe("LottoController", () => {
    describe('generateTicket', () => {
        test("Should generate an array of Ticket objects", () => {
            const ticketData = [
                [
                    [1, 2, 3, 4, 5, 6],
                    'Ambo',
                    ["Bari", "Cagliari"]
                ],
                [
                    [7, 8, 9],
                    'Terno',
                    ["Milano", "Napoli", "Palermo"],
                ]
            ];

            const tickets = LottoController.generateTicket(ticketData);

            expect(tickets).toHaveLength(2);
            expect(tickets[0]).toBeInstanceOf(Ticket);
            expect(tickets[1]).toBeInstanceOf(Ticket);
        });
    });

    describe("fakeExtraction", () => {
        test("Should return an Extraction object", () => {
            const extraction = LottoController.fakeExtraction();

            expect(extraction).toBeInstanceOf(Extraction);
        });
    });
});
