const prompt = require("prompt-sync")();
const print = require("../View/print");
const message = require("../View/messages");
const utils = require("./utils");
const { Validator } = require("../Model/Validator");
const { Ticket } = require("../Model/Ticket");

/**
 * Prompts the user to select the number of tickets they want to purchase, and returns the selected quantity.
 *
 * @returns {number} - The number of tickets selected by the user.
 */
const howManyTicket = () => {
  // Print a welcome message to the console
  print.printMessage(`\n${message.welcome}!\n`);

  while (true) {
    // Prompt the user to select a number of tickets
    print.printMessage(message.howManyTicket);
    const numberOfTicket = parseInt(prompt(message.choice));

    // Check if the user input is valid
    if (Validator.checkInRange(numberOfTicket, 1, 5)) {
      // Confirm the user's choice and return the selected quantity
      if (utils.confirmChoice(numberOfTicket)) {
        return numberOfTicket;
      }
    } else if (numberOfTicket === 0) {
        // Print a goodbye message and return
        print.printMessage(message.goodbye);
        return;
    } else {
        console.clear();
        // Print an error message and prompt the user again
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
    // Print a message to prompt the user
    print.printMessage(`\n${message.howManyNumbers}\n`);

    // Prompt the user to select a number of numbers
    const numbers = parseInt(prompt(message.choice));

    // Check if the user input is valid
    if (Validator.checkInRange(numbers, 1, 10)) {
      // Confirm the user's choice and return the selected quantity
      if (utils.confirmChoice(numbers)) {
        return numbers;
      }
    } else {
      // Print an error message and prompt the user again
      console.clear();
      print.printMessage(message.error);
    }
  }
};

/**
 * Get the type of ticket based on the number of tickets played and available types
 *
 * @param {number} numberPlayed - The number of tickets played
 * @param {array} availableTypes - The available types of tickets
 * @returns {array} - The selected types
 */
const getType = (numberPlayed, availableTypes = [...Ticket.types]) => {

  console.clear();

  // Initialize an empty array to store selected types
  const selectedTypes = [];

  // Use a loop to prompt the user to select ticket types until the user confirms the selection
  while (true) {
    // Display message to prompt user to choose ticket types and display available types
    print.printMessage(`\n${message.chooseType}`);
    availableTypes = utils.sliceArrayByLength(numberPlayed, availableTypes);
    print.printArray(availableTypes);

    // Prompt user for input and convert to lowercase
    const input = prompt(message.choice).toLowerCase();

    console.clear();

    // Check if user input is "c"
    if (input === "c") {
      // If no types have been selected, display a warning message
      if (selectedTypes.length === 0) {
        print.printMessage(`\n\n${message.warningMessageType}`);
        // If types have been selected, confirm the selection with the user and return the selected types if confirmed
      } else if (utils.confirmChoice(selectedTypes.join(" - "))) {
        return selectedTypes;
        // If the user does not confirm the selection, reset the available types to the default and clear the selected types
      } else {
        availableTypes = [...Ticket.types];
        selectedTypes.length = 0;
      }
      // If user input is not "c", try to select the ticket type based on the input
    } else {
      // Convert input to an index
      const index = parseInt(input) - 1;

      // Check if the index is within the range of available types
      const isValidInput = Validator.checkInRange(
        index,
        0,
        availableTypes.length - 1
      );

      // If the index is not valid, display an error message
      if (!isValidInput) {
        print.printMessage(message.error);
        // If the index is valid, select the ticket type, add it to the selected types array and remove the selected type from the available types
      } else {
        const selectedType = availableTypes[index];
        availableTypes.splice(index, 1);
        selectedTypes.push(selectedType);

        // Display a message indicating the selected type
        print.printMessage(`\n\n${message.youHaveChosen}`);
        print.printArray(selectedTypes);
      }
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

  // Initialize an empty array to store selected cities
  const selectedCities = [];

  // Use a loop to prompt user to select cities until the user confirms their selection
  while (true) {
    // Display message to prompt user to choose cities and display available cities
    print.printMessage(`\n${message.chooseCity}`);
    print.printArray(availableCties);

    // Prompt user for input and convert to lowercase
    const input = prompt(message.choice).toLowerCase();

    // Clear the console
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
      // Convert input to an index
      const index = parseInt(input) - 1;

      // Check if the index is within the range of available cities
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

        // Add the selected city to the selected cities array
        selectedCities.push(chosenCity);
        // Display a message indicating the selected city
        print.printMessage(`\n\n${message.youHaveChosen}`);
        print.printArray(selectedCities);
      }
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
    const numbers = howManyNumbers();

    const types = getType(numbers);

    const cities = getCities();

    // Add the ticket data to the array.
    ticketData.push([numbers, types, cities]);
  }

  // Return the array of ticket data.
  return ticketData;
};

module.exports = { howManyTicket, getTicketData };
