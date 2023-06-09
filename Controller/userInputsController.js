const prompt = require("prompt-sync")();
const print = require("../View/print");
const message = require("../View/messages");
const utils = require("./utils");
const { randomNumbers } = require("../Controller/utils");
const { Validator } = require("../Model/Validator");
const { Ticket } = require("../Model/Ticket");

/**
 * Prompts the user to select the number of tickets they want to purchase, and returns the selected quantity.
 *
 * @returns {number} - The number of tickets selected by the user.
 */
const howManyTicket = () => {
  print.printMessage(`\n${message.welcome}!\n`);

  while (true) {
    print.printMessage(message.howManyTicket);

    const input = parseInt(prompt(message.choice));
    const isValidInput = Validator.checkInRange(input, 1, 5);

    if (isValidInput) {
      if (utils.confirmChoice(input)) {
        return input;
      }
    } else {
      console.clear();
      print.printMessage(message.error);
    }
  }
};

/**
 * Prompts the user to select the number of numbers they want to play on their ticket, and returns the selected quantity.
 *
 * @returns {number} - The number of numbers selected by the user.
 */
const howManyNumbers = () => {
  console.clear();

  while (true) {
    print.printMessage(`\n${message.howManyNumbers}\n`);

    // Prompt the user to select a number of numbers
    const input = parseInt(prompt(message.choice));

    const isValidInput = Validator.checkInRange(input, 1, 10);
    if (isValidInput) {
      if (utils.confirmChoice(input)) {
        return input;
      }
    } else {
      console.clear();
      print.printMessage(message.error);
    }
  }
};

/**
 * Get the type of ticket based on the quantity of numbers played and available types
 *
 * @param {number} numberPlayed - The quantity of numbers played
 * @param {array} availableTypes - The avaiable types of tickets
 * @returns {string} - The selected type
 */
const getType = (numberPlayed, availableTypes = [...Ticket.types]) => {
  console.clear();

  while (true) {
    // Display message to prompt user to choose ticket type and display available types
    print.printMessage(`\n${message.chooseType}`);
    availableTypes = utils.sliceArrayByLength(numberPlayed, availableTypes);
    print.printArray(availableTypes);

    const input = prompt(message.choice).toLowerCase();

    console.clear();

    // Convert input to an index
    const index = parseInt(input) - 1;

    // Check if the index is within the range of available types
    const isValidInput = Validator.checkInRange(
      index,
      0,
      availableTypes.length - 1
    );

    if (isValidInput) {
      // Get the chosen type based on the index
      const chosenType = availableTypes[index];

      // Confirm the chosen type with the user
      if (utils.confirmChoice(chosenType)) {
        return chosenType;
      }
    } else {
      console.clear();
      print.printMessage(message.error);
    }
  }
};

/**
 * Get the list of cities based on available cities
 *
 * @param {array} availableCties - The available cities
 * @returns {array} - The selected cities
 */
const getCities = (availableCties = [...Ticket.cities]) => {
  console.clear();

  const selectedCities = [];

  while (true) {
    print.printMessage(`\n${message.chooseCity}`);
    print.printArray(availableCties);

    const input = prompt(message.choice).toLowerCase();

    console.clear();

    // Check if user input is "c"
    if (input === "c") {
      // If no cities have been selected, display a warning message
      if (selectedCities.length === 0) {
        print.printMessage(`\n\n${message.warningMessageCity}`);
        // If cities have been selected, confirm the selection with the user and return the selected cities if confirmed
      } else if (utils.confirmChoice(selectedCities.join(" - "))) {
        return selectedCities;
        // If the user does not confirm the selection, reset the available cities to the default and clear the selected cities
      } else {
        availableCties = [...Ticket.cities];
        selectedCities.length = 0;
      }
      // If user input is not "c", try to select the city based on the input
    } else {
      const index = parseInt(input) - 1;

      const isValidInput = Validator.checkInRange(
        index,
        0,
        availableCties.length - 1
      );

      // If the index is not valid, display an error message
      if (!isValidInput) {
        print.printMessage(message.error);
        // If the index is valid, select the city and add it to the selected cities array
      } else {
        const chosenCity = availableCties[index];
        const allCityIndex = index === 10;

        // If the selected city is not "All", remove "All" from the available cities and remove the selected city from the available cities
        if (!allCityIndex) {
          availableCties = availableCties.filter((_, i) => i !== 10);
          availableCties.splice(index, 1);
          // If the selected city is "All", clear the available cities array
        } else {
          availableCties = [];
        }

        selectedCities.push(chosenCity);

        print.printMessage(`\n\n${message.youHaveChosen}`);
        print.printArray(selectedCities);
      }
    }
  }
};

/**
 * Retrieves the bet amount from the user.
 * @returns {number} - The selected bet amount.
 */
const getBet = () => {
  console.clear();

  while (true) {
    print.printMessage(`\n${message.amount}\n`);

    const input = parseInt(prompt(message.choice));

    const isValidInput = Validator.checkInRange(input, 1, 200);

    if (isValidInput) {
      if (utils.confirmChoice(input)) {
        return input;
      }
    } else {
      console.clear();
      print.printMessage(message.error);
    }
  }
};

/**
 * Generate ticket data for a given number of tickets.
 *
 * @param {number} numberOfTickets The number of tickets to generate.
 * @returns {Array} An array of ticket data, each containing an array of numbers,
 * types, and cities.
 */
const getTicketData = (numberOfTickets) => {
  const ticketData = [];

  for (let i = 0; i < numberOfTickets; i++) {
    const quantityOfNumbers = howManyNumbers();

    const numbers = randomNumbers(quantityOfNumbers);

    const types = getType(quantityOfNumbers);

    const bet = getBet();

    const cities = getCities();

    // Add the ticket data to the array.
    ticketData.push([numbers, types, cities, bet]);
  }

  console.log(ticketData);
  return ticketData;
};

module.exports = { howManyTicket, getTicketData };
