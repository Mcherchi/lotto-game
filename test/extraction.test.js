const { Extraction } = require("../Model/Extraction");

describe("Extraction", () => {
  describe("Contructor", () => {
    let extraction;

    beforeEach(() => {
      extraction = new Extraction();
    });

    test("Should create a new instance of Extraction", () => {
      expect(extraction).toBeInstanceOf(Extraction);
    });

    test("Should assign a unique ID to the Extraction object", () => {
      expect(extraction._id).toBeDefined();
    });

    test("Should assign the current date to the Extraction object", () => {
      const currentDate = new Date().toLocaleDateString("it-IT");
      expect(extraction._date).toBe(currentDate);
    });

    test("Should generate number extraction for each city", () => {
      expect(extraction._extraction).toBeDefined();
      expect(Object.keys(extraction._extraction)).toEqual(extraction._cities);
    });

    test("Should generate 5 numbers for each city", () => {
      for (const city of extraction._cities) {
        const cityNumbers = extraction._extraction[city];
        expect(cityNumbers).toHaveLength(5);
        expect(cityNumbers.every((num) => Number.isInteger(num))).toBe(true);
      }
    });
  });

  describe("printExtraction", () => {
    let extraction;

    beforeEach(() => {
      extraction = new Extraction();
    });
    
    test("Should print the extraction table for all cities", () => {
      // Stub the console.log function
      console.log = jest.fn();

      extraction.printExtraction();

      // Verify if console.log function was called with the correct data
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(
          `Extraction #${extraction._id} - ${extraction._date}`
        )
      );
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("City"));
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Numbers")
      );

      for (const city of extraction._cities) {
        const cityNumbers = extraction._extraction[city].join(" - ");
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(city));
        expect(console.log).toHaveBeenCalledWith(
          expect.stringContaining(cityNumbers)
        );
      }
    });
  });
});
